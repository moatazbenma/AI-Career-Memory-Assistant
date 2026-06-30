from django.db import models
from django.contrib.auth.models import AbstractUser
import json
from django.db.models import Field
from cryptography.fernet import Fernet
import base64
import hashlib
import os


class EncryptedField(Field):
    """Custom field for encrypting sensitive data like tokens"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Generate a key from Django SECRET_KEY
        from django.conf import settings
        key_material = settings.SECRET_KEY.encode()
        # Derive a 32-byte key for Fernet
        key = base64.urlsafe_b64encode(hashlib.sha256(key_material).digest())
        self.cipher = Fernet(key)
    
    def get_internal_type(self):
        return "TextField"
    
    def from_db_value(self, value, expression, connection):
        if value is None:
            return value
        try:
            decrypted = self.cipher.decrypt(value.encode())
            return decrypted.decode()
        except Exception:
            return value
    
    def get_prep_value(self, value):
        if value is None:
            return value
        try:
            encrypted = self.cipher.encrypt(value.encode())
            return encrypted.decode()
        except Exception:
            return value


class User(AbstractUser):
    github_id = models.CharField(max_length=255, blank=True)
    access_token = EncryptedField(blank=True, default="") 

    class Meta:
        db_table = "user"


class Repository(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    repo_name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict)
    selected = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.repo_name} ({self.user.username})"

    class Meta:
        db_table = "repository"

class Job(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=255)
    job_description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.job_title} - {self.user.username}"

    class Meta:
        db_table = "job"

class Analysis(models.Model):
    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("processing", "Processing"),
        ("completed", "Completed"),
        ("failed", "Failed"),
    ]
    
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    repo = models.ForeignKey(Repository, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Analysis {self.id} ({self.status})"

    class Meta:
        db_table = "analysis"

class Result(models.Model):
    analysis = models.ForeignKey(Analysis, on_delete=models.CASCADE)
    task_id = models.CharField(max_length=255, blank=True)  # Celery task ID
    star_bullets = models.TextField()
    interview_questions = models.TextField()
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Result {self.id} for Analysis {self.analysis.id}"

    class Meta:
        db_table = "result"
