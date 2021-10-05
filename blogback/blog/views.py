# from rest_framework import filters
# import rest_framework
from .serializers import BlogSerialilzer
from .models import Blog
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser,MultiPartParser
from rest_framework.pagination import PageNumberPagination
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from django_filters import rest_framework as filters
# Create your views here.

class AuthorFilter(django_filters.FilterSet):
    author = filters.NumberFilter(field_name="author")
    class Meta:
        model = Blog
        fields = ['id','title']

class BlogPagePagination(PageNumberPagination):
    page_size = 10
    page_query_param = 'p'

class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerialilzer
    parser_classes = [FormParser,MultiPartParser]
    filter_backends =[DjangoFilterBackend]
    filterset_class = AuthorFilter
    # pagination_class = BlogPagePagination
    # filterset_fileds=['author']


# class BlogViewSet(viewsets.ViewSet):
#     parser_classes = [FormParser,MultiPartParser]
#     filter_backends =[DjangoFilterBackend]
#     filterset_fields = ['slug']
#     def list(self,request):
#         blog = Blog.objects.all()
#         serializer = BlogSerialilzer(blog,many=True)
#         return Response(serializer.data)
#     def retrieve(self,request,pk = None):
#         id = pk
#         if id  is  not None:
#             blog = Blog.objects.get(id=id)
#             serializer = BlogSerialilzer(blog)
#             return Response(serializer.data)
#     def create(self,request):
#         print(request.data)
#         data = {
#             'author':'',
#             'title':'',
#             'content':'',
#             'image':[]
#         }
#         data['author'] = request.data.get('author')
#         data['title'] = request.data.get('title')
#         data['content'] = request.data.get('content')
#         data['image'] = request.FILES['image']
#         serializer = BlogSerialilzer(data = data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response({'message':'Data posted Successfully'},status=status.HTTP_201_CREATED)
#         return Response({'message':'Somethin went wrong while posting your article'},status=status.HTTP_400_BAD_REQUEST)
            
        
#     def destroy(self,request,pk):
#         id=pk
#         if id is not None:
#             blog = Blog.objects.get(id=id)
#             blog.delete()
#             return Response({'message':'Your Article deleted successfully'},status = status.HTTP_200_OK)
#         return Response({'message':'Something went wrong'},status=status.HTTP_400_BAD_REQUEST)

#     def update(self,request,pk):
#         id = pk
#         if id is not None:
#             data = {
#             'author':'',
#             'title':'',
#             'content':'',
#             'image':[]
#         }
#             data['author'] = request.data.get('author')
#             data['title'] = request.data.get('title')
#             data['content'] = request.data.get('content')
#             data['image'] = request.FILES['image']

#             blog = Blog.objects.get(id=id)
#             serializer = BlogSerialilzer(blog,data = data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({'message':'Your article has been updated successfully'},status=status.HTTP_201_CREATED)
#             return Response({'message':'Somehing went wrong while trying to update data'},status=status.HTTP_400_BAD_REQUEST)
#         return Response(status=status.HTTP_404_NOT_FOUND)

            
            