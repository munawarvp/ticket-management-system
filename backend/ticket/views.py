from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Ticket
from ticket.serializer import TicketSerializer


class TicketView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    """
    View for ticket creation with data provided
    Request body:
            - title: str (required)
            - description: str (required)
            - priority: int (optional)
    Response:
            - success: bool
            - message: str
            - data: dict
    """
    def post(self, request):
        user = request.user
        try:
            data = request.data
            data['user'] = user.id
            serializer = TicketSerializer(data=data)
            if serializer.is_valid():
                serializer.save(user=user)
                return Response({"success": True, "message": "Ticket created successfully", "data": serializer.data}, status=200)
            return Response({"success": False, "message": "Ticket creation failed", "data": serializer.errors}, status=400)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
