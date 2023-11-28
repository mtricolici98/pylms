from django.contrib.auth.decorators import login_required
from django.core.exceptions import BadRequest
from rest_framework import status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_jwt.authentication import JSONWebTokenAuthentication
from .serializers import UserRegistrationSerializer
from .serializers import UserLoginSerializer, UserDetailSerializer
from .models import UserProfile


class UserRegistrationView(CreateAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        response = {
            "success": True,
            "status code": status.HTTP_200_OK,
            "message": "User registered successfully",
        }
        status_code = status.HTTP_200_OK
        return Response(response, status=status_code)


class UserLoginView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        response = {
            "email": serializer.data["email"],
            "message": "User logged in successfully",
            "token": serializer.data["token"],
        }
        status_code = status.HTTP_200_OK

        return Response(response, status=status_code)


class UserProfileView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    authentication_class = JSONWebTokenAuthentication

    def get(self, request):
        try:
            user_profile = UserProfile.objects.get(user=request.user)
            status_code = status.HTTP_200_OK
            response = {
                "success": True,
                "status code": status_code,
                "message": "User profile fetched successfully",
                "data": [
                    {
                        "name": user_profile.name,
                        "is_admin": request.user.is_staff or request.user.is_superuser
                    }
                ],
            }

        except Exception as e:
            status_code = status.HTTP_400_BAD_REQUEST
            response = {
                "success": False,
                "status code": status.HTTP_400_BAD_REQUEST,
                "message": "User does not exists",
                "error": str(e),
            }
        return Response(response, status=status_code)


@api_view(['POST'])
@authentication_classes([JSONWebTokenAuthentication])
def change_password(request):
    user = request.user
    new_password = request.data.get('new_password')
    if not new_password:
        raise BadRequest(dict(message='Empty new password'))
    user.set_password(new_password)
    user.save()
    return Response(status=200)
