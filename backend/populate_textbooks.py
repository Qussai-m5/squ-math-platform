import os
import django
from django.core.files.base import ContentFile

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'squ_math.settings')
django.setup()

from resources.models import Textbook

def populate():
    print("Populating textbooks...")
    
    books = [
        {
            'title': 'Calculus: Early Transcendentals',
            'author': 'James Stewart',
            'subject_area': 'PURE',
            'description': 'The standard textbook for Calculus I, II, and III courses.',
        },
        {
            'title': 'Linear Algebra and Its Applications',
            'author': 'David C. Lay',
            'subject_area': 'PURE',
            'description': 'A comprehensive introduction to linear algebra.',
        },
        {
            'title': 'Introduction to Probability Models',
            'author': 'Sheldon M. Ross',
            'subject_area': 'STATS',
            'description': 'Classic text for probability theory and stochastic processes.',
        },
        {
            'title': 'Numerical Analysis',
            'author': 'Richard L. Burden',
            'subject_area': 'APPLIED',
            'description': 'Covers the theory and application of modern numerical approximation techniques.',
        }
    ]

    for book_data in books:
        book, created = Textbook.objects.get_or_create(
            title=book_data['title'],
            defaults={
                'author': book_data['author'],
                'subject_area': book_data['subject_area'],
                'description': book_data['description']
            }
        )
        if created:
            # Create a dummy file content
            dummy_content = f"This is a dummy PDF file for {book.title}."
            book.file.save(f"{book.title.replace(' ', '_')}.pdf", ContentFile(dummy_content))
            book.save()
            print(f"Created: {book.title}")
        else:
            print(f"Already exists: {book.title}")

if __name__ == '__main__':
    populate()
