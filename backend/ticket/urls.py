from django.urls import path

from ticket.views import ListUsersView, TicketView, AdminTicketView, AssignTicketView

urlpatterns = [
    path('tickets', TicketView.as_view()),
    path('admin', AdminTicketView.as_view()),
    path('users', ListUsersView.as_view()),
    path('assign', AssignTicketView.as_view()),
]
