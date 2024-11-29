from django.urls import path

from ticket.views import TicketView, AdminTicketView

urlpatterns = [
    path('', TicketView.as_view()),
    path('admin', AdminTicketView.as_view()),
]
