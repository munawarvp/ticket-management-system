from django.contrib.auth.models import User
from rest_framework import serializers

from ticket.models import Ticket


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email']

class TicketSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Ticket
        fields = '__all__'