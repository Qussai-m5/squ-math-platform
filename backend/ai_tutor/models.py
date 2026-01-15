from django.db import models
import hashlib

class AISolution(models.Model):
    problem_hash = models.CharField(max_length=64, unique=True, db_index=True)
    problem_text = models.TextField()
    solution_content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.problem_hash:
            self.problem_hash = hashlib.sha256(self.problem_text.strip().lower().encode('utf-8')).hexdigest()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Solution for: {self.problem_text[:50]}..."
