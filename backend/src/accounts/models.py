# src/accounts/models.py
from django.db import models
from django.contrib.auth.models import User
from django_cryptography.fields import encrypt

class UserMFA(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='mfa')
    #encriptación de la llave secreta en la DB
    secret_key = encrypt(models.CharField(max_length=100, blank=True, null=True))
    mfa_enabled = models.BooleanField(default=False)

    def __str__(self):
        return f"MFA for {self.user.username}"

    
from django.db.models.signals import post_save
from django.dispatch import receiver

@receiver(post_save, sender=User)
def create_user_mfa(sender, instance, created, **kwargs):
    if created:
        UserMFA.objects.create(user=instance)