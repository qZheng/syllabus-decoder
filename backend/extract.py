import pdfplumber

def normalize_text(text):
    lines = text.split('\n')
    cleaned = [line.strip() for line in lines if line.strip()]
    return '\n'.join(cleaned)

# with pdfplumber.open("pdfs/Syllabus.pdf") as pdf:
#     all_text = ""
#     for page in pdf.pages:
#         text = page.extract_text()
#         if text:
#             all_text += text + "\n\n"
#     normalize_text(all_text)
#     print(all_text)

with pdfplumber.open("pdfs/Syllabus2.pdf") as pdf:
    all_text = ""
    for page in pdf.pages:
        text = page.extract_text()
        if text:
            all_text += text + "\n\n"
    normalize_text(all_text)
    print(all_text)

