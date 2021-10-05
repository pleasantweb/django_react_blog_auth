from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Blog
from rest_framework import serializers

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id','email','first_name','last_name','password')

class BlogSerialilzer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField()   #CharField(source='author_detail',read_only=True)
    class Meta:
        model = Blog
        fields = ('id','author','title','content','image','date','slug','author_name')