from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status

class AISolverTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.url = reverse('ai_solve')

    def test_solve_endpoint_mock(self):
        """
        Test that the solve endpoint returns the mock solution when no API key is present
        (or if we just want to verify the structure).
        """
        data = {'problem': 'Integration of x^2'}
        response = self.client.post(self.url, data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('solution', response.data)
        self.assertIsInstance(response.data['solution'], str)

    def test_solve_endpoint_missing_data(self):
        data = {}
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
