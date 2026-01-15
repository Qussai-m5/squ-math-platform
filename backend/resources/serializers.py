from rest_framework import serializers
from .models import Textbook, Material
from academics.serializers import CourseSerializer

class TextbookSerializer(serializers.ModelSerializer):
    subject_display = serializers.CharField(source='get_subject_area_display', read_only=True)

    class Meta:
        model = Textbook
        fields = ['id', 'title', 'author', 'subject_area', 'subject_display', 'file', 'cover_image', 'description', 'uploaded_at']

class MaterialSerializer(serializers.ModelSerializer):
    type_display = serializers.CharField(source='get_material_type_display', read_only=True)
    course_details = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Material
        fields = ['id', 'course', 'course_details', 'title', 'material_type', 'type_display', 'file', 'uploaded_at', 'is_approved']
        read_only_fields = ['is_approved', 'uploaded_at']
