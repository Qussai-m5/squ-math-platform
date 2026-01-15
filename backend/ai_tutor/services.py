import os
import hashlib
import google.generativeai as genai
from django.conf import settings
from .models import AISolution

def solve_math_problem(problem_text):
    """
    Solves a math problem using Google Gemini API with caching.
    """
    api_key = os.getenv('GEMINI_API_KEY')
    
    # Check cache first
    problem_hash = hashlib.sha256(problem_text.strip().lower().encode('utf-8')).hexdigest()
    cached_solution = AISolution.objects.filter(problem_hash=problem_hash).first()
    
    if cached_solution:
         return {"solution": cached_solution.solution_content}
    
    if not api_key:
        return {
            "solution": (
                "## Mock Solution (No Key)\n\n"
                "To solve the problem **" + problem_text + "**, we normally use integral calculus.\n\n"
                "1. **Step 1**: Identify the function.\n"
                "2. **Step 2**: Apply power rule.\n"
                "3. **Step 3**: Verify result.\n\n"
                "**Answer**: 42 (This is a mock response because no API key was found)."
            )
        }

    try:
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-flash-latest')
        
        prompt = (
            "You are a helpful math tutor. Provide step-by-step detailed explanations using Markdown and LaTeX for math formulas. "
            f"Solve this problem and explain step-by-step: {problem_text}"
        )
        
        response = model.generate_content(prompt)
        
        if response.text:
             # Cache the result
             AISolution.objects.create(
                 problem_hash=problem_hash,
                 problem_text=problem_text,
                 solution_content=response.text
             )
             return {"solution": response.text}
        else:
             raise Exception("Empty response from Gemini")

    except Exception as e:
        error_str = str(e)
        if "429" in error_str or "quota" in error_str.lower():
            return {
                "solution": (
                    "> **System Busy**: The system is currently busy (Time is Off). Please try again later.\n\n"
                    "*(This happens when the free API tier limits are reached. Wait a minute and try again.)*"
                )
            }
            
        # Fallback to mock if API fails for other reasons
        return {
            "solution": (
                f"> **⚠️ API Error**: {error_str}\n\n"
                "## Mock Solution (Fallback)\n\n"
                "To solve the problem **" + problem_text + "**, we normally use integral calculus.\n\n"
                "1. **Step 1**: Identify the function.\n"
                "2. **Step 2**: Apply power rule.\n"
                "3. **Step 3**: Verify result.\n\n"
                "**Answer**: 42 (This is a mock response because the API call failed)."
            )
        }
