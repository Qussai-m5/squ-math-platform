from rest_framework import viewsets, permissions, parsers
from .models import Textbook, Material
from .serializers import TextbookSerializer, MaterialSerializer

class TextbookViewSet(viewsets.ModelViewSet):
    queryset = Textbook.objects.all()
    serializer_class = TextbookSerializer
    search_fields = ['title', 'author']
    filterset_fields = ['subject_area']

class MaterialViewSet(viewsets.ModelViewSet):
    queryset = Material.objects.filter(is_approved=True)
    serializer_class = MaterialSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    filterset_fields = ['course', 'material_type']
    search_fields = ['title', 'course__code', 'course__name']

    def perform_create(self, serializer):
        # Auto-approve for simplicity in this demo, or keep false
        serializer.save(is_approved=True)

    def get_queryset(self):
        # Allow admins to see all, others only approved
        if self.request.user.is_staff:
            return Material.objects.all()
        return Material.objects.filter(is_approved=True)
