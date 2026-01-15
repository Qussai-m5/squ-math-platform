import os
import django

# Setup Django Environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'squ_math.settings')
django.setup()

from academics.models import Course

def populate():
    courses = [
        # Year 1 & 2 (2000 Level)
        ('MATH2107', 'Calculus I', 1),
        ('MATH2108', 'Calculus II', 1),
        ('MATH2201', 'Linear Algebra', 1),
        ('MATH2350', 'Foundations of Mathematics', 1),
        
        # Year 2/3 (3000 Level)
        ('MATH3111', 'Calculus III', 2),
        ('MATH3171', 'Linear Algebra & Multivariate Calc', 2),
        ('MATH3302', 'Ordinary Differential Equations', 2),
        ('MATH3303', 'Linear Algebra II', 2),
        ('MATH3340', 'Discrete Math for CS', 2),
        ('MATH3360', 'Discrete Mathematics', 2),
        ('MATH3573', 'Graph Theory', 2),

        # Year 3/4 (4000 Level)
        ('MATH4141', 'Numerical Analysis', 3),
        ('MATH4450', 'Real Analysis I', 3),
        ('MATH4452', 'Intro to Complex Variables', 3),
        ('MATH4453', 'Abstract Algebra I', 3),
        ('MATH4473', 'Linear Programming', 3),
        ('MATH4474', 'Partial Differential Equations', 3),
        ('MATH4174', 'Diff Equations for Engineers', 3),
        
        # Advanced / Electives (5000 Level)
        ('MATH4599', 'Introduction to Topology', 4),
        ('MATH5470', 'Integral Transforms', 5),
        ('MATH5551', 'Fluid Dynamics', 5),
        ('MATH5558', 'Number Theory', 5),
        ('MATH5553', 'Differential Geometry', 5),
    ]

    print("Populating Courses...")
    for code, name, year in courses:
        course, created = Course.objects.get_or_create(
            code=code,
            defaults={
                'name': name,
                'year_level': year,
                'description': f"Official SQU Course: {name}"
            }
        )
        if created:
            print(f"Created: {code}")
        else:
            print(f"Exists: {code}")

if __name__ == '__main__':
    populate()
