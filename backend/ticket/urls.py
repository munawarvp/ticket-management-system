from django.urls import path

from ticket.views import TicketView, AdminTicketView

urlpatterns = [
    path('tickets', TicketView.as_view()),
    path('admin', AdminTicketView.as_view()),
]
