from django.contrib import admin
from .models import Course

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('code', 'name', 'year_level')
    list_filter = ('year_level',)
    search_fields = ('code', 'name')
