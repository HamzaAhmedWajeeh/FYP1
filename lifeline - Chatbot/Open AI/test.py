from openai import OpenAI
import re
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

fine_tuned_data = ["headache", "fever", "cough", "fatigue", "nausea", "vomiting", "diarrhea"]

user_prompt = "I am not feeling well, I am having headache."

completion = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "Given symptoms: " + ", ".join(fine_tuned_data)},
        {"role": "user", "content": user_prompt}
    ],
    max_tokens=50,
    n=1,
    stop=None,
)

keywords = re.findall(r'"(.*?)"', completion['choices'][0]['message']['content'])

print("Extracted Keywords:", keywords)