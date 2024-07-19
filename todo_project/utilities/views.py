from rest_framework import generics
from rest_framework import filters
from todo.models import Task
from todo.serializers import TaskSerializer

class TaskSearchView(generics.ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'description', 'category', 'tags']
