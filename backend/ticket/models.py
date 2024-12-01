from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Ticket(models.Model):
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    status_choices = [
        ('open', 'Open'),
        ('in-progress', 'In Progress'),
        ('resolved', 'Resolved'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    title = models.CharField(max_length=100)
    description = models.TextField()
    priority = models.CharField(max_length=25, choices=PRIORITY_CHOICES)
    status = models.CharField(max_length=25, choices=status_choices, default='open')
    assigned_to = models.ForeignKey(User, related_name='assigned_tickets', on_delete=models.SET_NULL, null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title