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


def format_prompt(chunk):
    prompt = f"""
    You are processing an arbitrary chunk of text taken from a university course syllabus. This is only **a portion** of the full syllabus—it may contain incomplete sentences or span multiple sections (e.g. grading, instructors, deadlines, etc).
    Your job is to extract any **clearly available** course information from this chunk and output a JSON object in the following schema. Only include fields that are explicitly mentioned in the text. All other fields must be set to `null` or empty lists.

    Input text:
    {chunk}

Expected JSON format:
{{ 
  "instructor": {{
    "name": ..., 
    "email": ..., 
    "office_hours": ...
  }},
  "TAs": [
    {{
      "name": ..., 
      "email": ..., 
      "office_hours": ...
    }}
  ],
  "grading": [
    {{
      "component": ..., 
      "weight_percent": ...
    }}
  ],
  "deadlines": [
    {{
      "name": ..., 
      "date": ..., 
      "type": "assignment/exam/quiz/etc"
    }}
  ],
  "policies": {{
    "late_policy": ..., 
    "attendance_policy": ..., 
    "extra_credit": ...
  }},
  "textbooks": [
    {{
      "title": ..., 
      "author": ..., 
      "isbn": ...
    }}
  ]
}}

Guidelines:
- Do not fabricate or assume anything not present in the chunk.
- It's okay if most fields are null—this is expected.
- Output only the JSON object. No extra explanation.
    """
    print(chunk)
    return prompt.strip()


def combine_jsons(jsons):
    combined = {
        "instructor": {"name": None, "email": None, "office_hours": None},
        "TAs": [],
        "grading": [],
        "deadlines": [],
        "policies": {
            "late_policy": None,
            "attendance_policy": None,
            "extra_credit": None,
        },
        "textbooks": [],
    }

    def merge_field(field, current_value, new_value):
        if isinstance(current_value, dict) and isinstance(new_value, dict):
            for k, v in new_value.items():
                if (
                    v is not None
                    and v != ""
                    and (current_value.get(k) in (None, "", [], {}))
                ):
                    current_value[k] = v
            return current_value
        elif isinstance(current_value, list) and isinstance(new_value, list):
            existing = current_value.copy()
            for item in new_value:
                if item not in existing:
                    current_value.append(item)
            return current_value
        else:
            return new_value if new_value not in (None, "", [], {}) else current_value

    for json_str in jsons:
        try:
            obj = json.loads(json_str)
        except Exception as e:
            continue

        for key in combined.keys():
            if key in obj:
                combined[key] = merge_field(key, combined[key], obj[key])

    return combined


def extract_info(text):
    try:
        max_chunk_size = 2000
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
                    {"role": "user", "content": format_prompt(chunk)}
                ],
                response_format={'type': 'json_object'},
                max_tokens=4000,
                temperature=0.5,
            )
            print(response)
            responses.append(response.choices[0].message.content)

        combined = combine_jsons(responses)
        return combined
    except Exception as e:
        print(f"Error: {str(e)}")
        return "failed"

def clean(data):
    prompt = f"""
    You are given a partially filled course information JSON extracted from a university syllabus. Your task is to clean, normalize, and fix the data:

    Rules:
    - Ensure all email addresses are properly formatted (e.g. `john at email dot com` → `john@email.com`).
    - Format office hours into Day xx:xx i.e "Wednesday 10:00–12:00".
    - Deduplicate textbook entries. If two entries share a title or an author but differ in other fields, combine them into one if logically consistent.
    - Ensure grading weights add up to 100%. If there's inconsistencies, use your best judgment to adjust them.
    - Standardize date formats to YYYY-MM-DD.
    - Leave all clearly unknown values as `null`.

    Here's the raw extracted JSON:

    ```json
    {json.dumps(data, indent=2)}
    ```

    Return ONLY the cleaned JSON object with the same structure.
    """

    response = client.chat.completions.create(
        model="deepseek-chat",
        messages=[
            {"role": "system", "content": "You clean and validate JSON extracted from course syllabi."},
            {"role": "user", "content": prompt}
        ],
        response_format={"type": "json_object"},
        max_tokens=2000,
        temperature=0.2,
    )

    try:
        return json.loads(response.choices[0].message.content)
    except Exception as e:
        print(f"{e}")
        return data



if __name__ == "__main__":
    text = extract_text()
    result = clean(extract_info(text))
    print(json.dumps(result, indent=2))
    print(result)
    app.run(port=5000)
