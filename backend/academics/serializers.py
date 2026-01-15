from rest_framework import serializers
from .models import Course

class CourseSerializer(serializers.ModelSerializer):
    year_display = serializers.CharField(source='get_year_level_display', read_only=True)

    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'year_level', 'year_display', 'description']
