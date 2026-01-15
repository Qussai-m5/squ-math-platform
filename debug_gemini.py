import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv('backend/.env')

api_key = os.getenv('GEMINI_API_KEY')
print(f"Loaded API Key: {api_key[:10]}...{api_key[-5:] if api_key else 'None'}")

try:
    print("Attempting to connect to Gemini...")
    genai.configure(api_key=api_key)
    
    print("Listing available models:")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(m.name)
            
    # Try a standard model
    print("\nAttempting generation with 'gemini-flash-latest'...")
    model = genai.GenerativeModel('gemini-flash-latest')
    response = model.generate_content("Hello")
    print("Success with gemini-flash-latest!")
    print(response.text)

except Exception as e:
    print("FAILED")
    print(e)
