from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("DEEPSEEK_API_KEY")
if not api_key:
    raise ValueError("DEEPSEEK_API_KEY not found in .env")

client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")

import pdfplumber
import json

def normalize_text(text):
    lines = text.split("\n")
    cleaned = [line.strip() for line in lines if line.strip()]
    return "\n".join(cleaned)


# with pdfplumber.open("pdfs/Syllabus.pdf") as pdf:
#     all_text = ""
#     for page in pdf.pages:
#         text = page.extract_text()
#         if text:
#             all_text += text + "\n\n"
#     normalize_text(all_text)
#     print(all_text)


def extract_text(pdf_path="pdfs/Syllabus.pdf"):  # <---- For testing change later
    with pdfplumber.open(pdf_path) as pdf:
        all_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                all_text += text + "\n\n"
        return normalize_text(all_text)


app = Flask(__name__)
CORS(
    app,
    resources={
        r"/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
        }
    },
)


def format_prompt(text):
    prompt = """
    You are processing an arbitrary chunk of text taken from a university course syllabus. This is only **a portion** of the full syllabus—it may contain incomplete sentences or span multiple sections (e.g. grading, instructors, deadlines, etc).
    Your job is to extract any **clearly available** course information from this chunk and output a JSON object in the following schema. Only include fields that are explicitly mentioned in the text. All other fields must be set to `null` or empty lists.

Expected JSON format:
{
  "instructor": {
    "name": ...,
    "email": ...,
    "office_hours": ...
  },
  "TAs": [
    {
      "name": ...,
      "email": ...,
      "office_hours": ...
    }
  ],
  "grading": [
    {
      "component": ...,
      "weight_percent": ...
    }
  ],
  "deadlines": [
    {
      "name": ...,
      "date": ...,
      "type": "assignment/exam/quiz/etc"
    }
  ],
  "policies": {
    "late_policy": ...,
    "attendance_policy": ...,
    "extra_credit": ...
  },
  "textbooks": [
    {
      "title": ...,
      "author": ...,
      "isbn": ...
    }
  ]
}

Guidelines:
- Do not fabricate or assume anything not present in the chunk.
- It's okay if most fields are null—this is expected.
- Output only the JSON object. No extra explanation.
    """
    return prompt.strip()

def extract_info(text):
    try:
        max_chunk_size = 4000
        chunks = [
            text[i : i + max_chunk_size] for i in range(0, len(text), max_chunk_size)
        ]

        responses = []
        for chunk in chunks:
            response = client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {
                        "role": "system",
                        "content": "You are a helpful AI that extracts structured information from text",
                    },
                    {"role": "user", "content": format_prompt(chunk)},
                ],
                max_tokens=4000,
                temperature=0.5,
            )
            responses.append(response.choices[0].message.content)

        # Combine responses (simple implementation - will improve later)
        combined = " ".join(responses)
        return combined.strip()
    except Exception as e:
        print(f"Error: {str(e)}")
        return "failed"
    
  


if __name__ == "__main__":
    text = extract_text()
    result = extract_info(format_prompt(text))
    print(result)
    app.run(port=5000)
