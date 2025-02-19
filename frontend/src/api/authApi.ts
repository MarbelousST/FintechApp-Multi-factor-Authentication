import axios from 'axios';

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Compara con 'name='
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  console.log('cookieValue', cookieValue)
  return cookieValue;
}

// Configura la instancia base, apuntando a tu backend
const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  withCredentials: true,   // Para manejar cookies/sesiones si usas session-based
});

// Registro de usuario
export const registerUser = async (username: string, email: string, password: string) => {
  const response = await api.post('/accounts/register/', { username, email, password }, { withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  console.log(response)
  return response.data;
};

// Login
export const loginUser = async (username: string, password: string) => {
  // Retorna { message: 'MFA_REQUIRED' } o { message: 'LOGIN_OK' }, etc.
  const response = await api.post('/accounts/login/', { username, password }, { withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  return response.data;
};

// Logout
export const logoutUser = async () => {
  const response = await api.post('/accounts/logout/', {},  { withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  return response.data;
};

// MFA: Paso 1 (Setup: genera secret)
export const setupMFA = async () => {
  // Protegido: usuario debe estar loggeado
  const response = await api.post('/accounts/mfa/mfa-setup/', {}, { withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  return response.data; 
  // => { otp_uri, qr_code, message }
};

// MFA: Validar la config inicial (Verifica primer TOTP para habilitar)
export const verifyMFASetup = async (code: string) => {
  const response = await api.post('/accounts/mfa/verify-setup/', { code }, { withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  return response.data;
};

// MFA: Verificar TOTP en Login (segundo paso)
export const verifyMFALogin = async (code: string) => {
  const response = await api.post('/accounts/mfa/verify/', { code } , { withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  return response.data;
};

// MFA: Deshabilitar
export const disableMFA = async () => {
  const response = await api.post('/accounts/mfa/disable/', {} ,{ withCredentials: true, headers: {
    "X-CSRFToken": getCookie('csrftoken'), // Reemplaza con tu forma de obtener la cookie
  } });
  return response.data;  // e.g. {message: 'MFA deshabilitada'}
};