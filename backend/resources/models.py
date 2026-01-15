from django.db import models
from academics.models import Course

class Textbook(models.Model):
    SUBJECT_AREAS = [
        ('PURE', 'Pure Mathematics'),
        ('APPLIED', 'Applied Mathematics'),
        ('STATS', 'Statistics & Probability'),
        ('GENERAL', 'General / Other'),
    ]

    title = models.CharField(max_length=200)
    author = models.CharField(max_length=200)
    subject_area = models.CharField(max_length=20, choices=SUBJECT_AREAS)
    file = models.FileField(upload_to='textbooks/')
    cover_image = models.ImageField(upload_to='covers/', blank=True, null=True)
    description = models.TextField(blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Material(models.Model):
    TYPE_CHOICES = [
        ('NOTE', 'Summary / Note'),
        ('EXAM', 'Past Exam'),
        ('SOLN', 'Solution'),
        ('OTHER', 'Other'),
    ]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='materials')
    title = models.CharField(max_length=200)
    material_type = models.CharField(max_length=5, choices=TYPE_CHOICES)
    file = models.FileField(upload_to='materials/')
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    # Moderation
    is_approved = models.BooleanField(default=False, help_text="Approve to make visible on the site")
    
    def __str__(self):
        return f"{self.course.code} - {self.get_material_type_display()} - {self.title}"
