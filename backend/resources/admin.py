from django.contrib import admin
from .models import Textbook, Material

@admin.register(Textbook)
class TextbookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'subject_area', 'uploaded_at')
    list_filter = ('subject_area',)
    search_fields = ('title', 'author')

@admin.register(Material)
class MaterialAdmin(admin.ModelAdmin):
    list_display = ('title', 'course', 'material_type', 'is_approved', 'uploaded_at')
    list_filter = ('is_approved', 'material_type', 'course__year_level')
    search_fields = ('title', 'course__code', 'course__name')
    actions = ['approve_materials']

    def approve_materials(self, request, queryset):
        queryset.update(is_approved=True)
    approve_materials.short_description = "Approve selected materials"
