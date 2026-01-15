from django.db import models

class Course(models.Model):
    YEAR_CHOICES = [
        (1, 'Year 1'),
        (2, 'Year 2'),
        (3, 'Year 3'),
        (4, 'Year 4'),
        (5, 'Elective / Advanced'),
    ]

    code = models.CharField(max_length=20, unique=True, help_text="e.g., MATH2107")
    name = models.CharField(max_length=200)
    year_level = models.IntegerField(choices=YEAR_CHOICES)
    description = models.TextField(blank=True)

    def __str__(self):
        return f"{self.code} - {self.name}"

    class Meta:
        ordering = ['year_level', 'code']
