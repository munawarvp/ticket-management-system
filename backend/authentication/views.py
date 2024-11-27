from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from authentication.serializer import UserSerializer, LoginUserSerializer

# Create your views here.
class RegisterView(APIView):
    """
    View for user registration
    Request body:
        - first_name str (required)
        - last_name str (required)
        - username str (required)
        - email str (required)
        - password str (required)
    Response:
        - success boolean
        - message str
    """
    def post(self, request):
        try:
            data = request.data

            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response({"success": True, "message": "User created successfully"}, status=200)
            return Response({"success": False, "message": "User creation failed", "data": serializer.errors}, status=400)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)


class LoginView(APIView):
    """
    View for user login
    Request body:
        - username str (required)
        - password str (required)
    Response:
        - refresh token
        - access token
        - is_admin (boolean)
    """
    def post(self, request):
        try:
            serializer = LoginUserSerializer(data=request.data)
            if serializer.is_valid():
                data = serializer.validated_data
                # Django built-in authentication function to authenticate user
                user = authenticate(username=data["username"], password=data["password"])
                if user:
                    # Token generation for user
                    refresh = RefreshToken.for_user(user)
                    response = {
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "is_admin": user.is_superuser
                    }
                    return Response({"success": True, "message": "User logged in successfully", "data": response}, status=200)
            return Response({"success": False, "message": "User Login Failed", "data": serializer.errors}, status=400)
        except Exception as e:
            return Response({"success": False, "message": str(e)}, status=400)