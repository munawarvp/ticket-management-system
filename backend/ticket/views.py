from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import Ticket
from ticket.serializer import TicketSerializer


class TicketView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
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
        
    def get(self, request):
        """
        View for ticket listing
        Params:
                - ticket_id: int (not required)
        Response:
                - success: bool
                - message: str
                - data: list | dict
        """
        user = request.user
        ticket_id = request.GET.get('ticket_id')
        try:
            if ticket_id:
                ticket = Ticket.objects.get(id=ticket_id, user=user)
                serializer = TicketSerializer(ticket)
            else:
                tickets = Ticket.objects.filter(user=user)
                serializer = TicketSerializer(tickets, many=True)
            return Response({"success": True, "message": "Ticket listing successful", "data": serializer.data}, status=200)
        except Ticket.DoesNotExist:
            return Response({"success": False, "message": "Ticket not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        

    def delete(self, request):
        """
        View for ticket deletion
        Params:
                - ticket_id: int (required)
        Response:
                - success: bool
                - message: str
        """
        user = request.user
        ticket_id = request.GET.get('ticket_id')
        try:
            ticket = Ticket.objects.get(id=ticket_id, user=user)
            ticket.delete()
            return Response({"success": True, "message": "Ticket deleted successfully"}, status=200)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
        

    def put(self, request):
        """
        View for ticket update
        Params:
                - ticket_id: int (required)
        Request body:
                - title: str (optional)
                - description: str (optional)
                - priority: int (optional)
        Response:
                - success: bool
                - message: str
                - data: dict
        """
        user = request.user
        ticket_id = request.GET.get('ticket_id')
        try:
            ticket = Ticket.objects.get(id=ticket_id, user=user)
            data = request.data
            serializer = TicketSerializer(ticket, data=data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({"success": True, "message": "Ticket updated successfully", "data": serializer.data}, status=200)
            return Response({"success": False, "message": "Ticket update failed", "data": serializer.errors}, status=400)
        except Ticket.DoesNotExist:
            return Response({"success": False, "message": "Ticket not found"}, status=404)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)
