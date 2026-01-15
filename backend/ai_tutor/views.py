from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .services import solve_math_problem

class SolveView(APIView):
    def post(self, request):
        problem_text = request.data.get('problem')
        if not problem_text:
            return Response({"error": "Problem text is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        result = solve_math_problem(problem_text)
        
        if "error" in result:
             return Response(result, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
             
        return Response(result)
