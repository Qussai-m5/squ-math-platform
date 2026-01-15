import os
import openai
from dotenv import load_dotenv

load_dotenv('backend/.env')

api_key = os.getenv('OPENAI_API_KEY')
print(f"Loaded API Key: {api_key[:10]}...{api_key[-5:] if api_key else 'None'}")

client = openai.OpenAI(api_key=api_key)

try:
    print("Attempting to connect to OpenAI...")
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "user", "content": "Hello"}
        ]
    )
    print("Success!")
    print(response.choices[0].message.content)
except Exception as e:
    print("FAILED")
    print(e)
