# src/accounts/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer

import pyotp
import base64
import os
import qrcode
import qrcode.image.svg
from io import BytesIO
from django.contrib.auth.models import User
from .models import UserMFA

class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'message': 'Usuario creado exitosamente'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            # Verificar si tiene MFA habilitada
            if user.mfa.mfa_enabled:
                # Retornar una señal de que hace falta MFA
                # Podrías generar un token temporal (firmado) o usar session
                request.session['temp_user_id'] = user.id
                return Response({'message': 'MFA_REQUIRED'}, status=status.HTTP_200_OK)
            else:
                # Login normal
                login(request, user)
                return Response({'message': 'LOGIN_OK'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        
class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'Logout exitoso'}, status=status.HTTP_200_OK)


class SetupMFAView(APIView):
    """
    Paso 1: Genera la clave secreta y devuelve la URI y/o el QR code
    *NO* marca mfa_enabled todavía.
    """
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generar clave secreta base32
        secret_key = base64.b32encode(os.urandom(10)).decode('utf-8')

        # Almacenar la clave en la DB, pero mfa_enabled sigue en False
        user_mfa, created = UserMFA.objects.get_or_create(user=user)
        user_mfa.secret_key = secret_key
        user_mfa.mfa_enabled = False  # Importante: aún no activamos
        user_mfa.save()

        # Crear la uri TOTP
        issuer = "TuAppFintech"
        otp_uri = f"otpauth://totp/{issuer}:{user.username}?secret={secret_key}&issuer={issuer}"

        # Opcional: Generar QR en backend
        qr = qrcode.make(otp_uri)
        buffer = BytesIO()
        qr.save(buffer, format='PNG')
        qr_code_base64 = base64.b64encode(buffer.getvalue()).decode('utf-8')
        data_uri = f"data:image/png;base64,{qr_code_base64}"

        return Response({
            "otp_uri": otp_uri,
            "qr_code": data_uri,
            "message": "Clave generada. Escanea el QR e ingresa el código en el próximo paso."
        }, status=status.HTTP_200_OK)

class VerifyMFASetupView(APIView):
    """
    Paso 2: El usuario ingresa el código TOTP que generó la app
    Si es válido, activamos la MFA. Si no, retornamos error.
    """
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)

        code = request.data.get('code')
        if not code:
            return Response({'error': 'Falta el código TOTP'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_mfa = user.mfa
        except UserMFA.DoesNotExist:
            return Response({'error': 'El usuario no tiene un registro MFA.'}, status=status.HTTP_400_BAD_REQUEST)

        # Validar que el usuario haya generado ya una secret_key
        if not user_mfa.secret_key:
            return Response({'error': 'No se ha generado una clave secreta para MFA.'},
                            status=status.HTTP_400_BAD_REQUEST)

        # Verificar el código con pyotp
        totp = pyotp.TOTP(user_mfa.secret_key)
        if totp.verify(code):
            # Código correcto: habilitamos la MFA
            user_mfa.mfa_enabled = True
            user_mfa.save()
            return Response({'message': 'MFA habilitada correctamente'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Código TOTP inválido'}, status=status.HTTP_401_UNAUTHORIZED)


class EnableMFAView(APIView):
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generar una clave secreta aleatoria
        secret_key = base64.b32encode(os.urandom(10)).decode('utf-8')

        user_mfa, _ = UserMFA.objects.get_or_create(user=user)
        user_mfa.secret_key = secret_key
        user_mfa.mfa_enabled = True
        user_mfa.save()

        # Crear la URL OTP para Google Authenticator
        # form: otpauth://totp/<issuer>:<username>?secret=<secret>&issuer=<issuer>
        issuer = "CrezeApp" 
        otp_uri = f"otpauth://totp/{issuer}:{user.username}?secret={secret_key}&issuer={issuer}"

        # Crear QR
        qr = qrcode.make(otp_uri)
        buffer = BytesIO()
        qr.save(buffer, format='PNG')
        img_str = base64.b64encode(buffer.getvalue()).decode('utf-8')

        return Response({
            "otp_uri": otp_uri,
            "qr_code_base64": f"data:image/png;base64,{img_str}"
        }, status=status.HTTP_200_OK)

class DisableMFAView(APIView):
    def post(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'No autorizado'}, status=status.HTTP_401_UNAUTHORIZED)

        user_mfa = user.mfa
        user_mfa.mfa_enabled = False
        user_mfa.secret_key = None
        user_mfa.save()

        return Response({'message': 'MFA deshabilitada'}, status=status.HTTP_200_OK)