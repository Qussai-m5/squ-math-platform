import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'squ_math.settings')
django.setup()

from django.contrib.auth.models import User

username = 'admin'
email = 'admin@example.com'
password = 'admin'

try:
    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username, email, password)
        print(f"SUCCESS: Superuser '{username}' created with password '{password}'")
    else:
        u = User.objects.get(username=username)
        u.set_password(password)
        u.save()
        print(f"SUCCESS: Superuser '{username}' updated with password '{password}'")
except Exception as e:
    print(f"ERROR: {e}")
