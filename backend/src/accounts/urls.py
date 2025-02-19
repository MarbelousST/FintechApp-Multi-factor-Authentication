from django.urls import path
from .views import (
    RegisterView,
    LoginView,
    LogoutView,
    SetupMFAView,
    EnableMFAView,
    DisableMFAView,
    VerifyMFASetupView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),

    # MFA
    path('mfa/mfa-setup/', SetupMFAView.as_view(), name='mfa_setup'),
    path('mfa/enable/', EnableMFAView.as_view(), name='enable_mfa'),
    path('mfa/disable/', DisableMFAView.as_view(), name='disable_mfa'),
    path('mfa/verify-setup/', VerifyMFASetupView.as_view(), name='mfa_verify_setup'),
]
