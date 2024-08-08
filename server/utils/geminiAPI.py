import os

import fitz
import google.generativeai as genai

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
GEMINI_MODEL = os.environ.get("GEMINI_MODEL")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(GEMINI_MODEL)


# -----------------------------------------------------------------------------


def uploadPDF(file):
    if file.content_type == "application/pdf":
        text = parse_pdf(file)
        return geminiAPI(text)

    elif file.content_type == "text/plain":
        return geminiAPI(file.read())

    else:
        raise ValueError("Unsupported file type")


# -----------------------------------------------------------------------------


def parse_pdf(pdf_file):
    pdf_file.seek(0)
    pdf_document = fitz.open(stream=pdf_file.read(), filetype="pdf")
    text = ""
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        text += page.get_text()
    return text


# -----------------------------------------------------------------------------


def geminiAPI(text):
    prompt = (
        """
    ---
    From the follwing text, extract a list of topics, which are the main
    ideas or concepts discussed in the text.
    Make sure to include the most important topics and exclude any irrelevant
    or minor details.
    Return the list of topics in the follwing format:
    topic1|topic2|topic3|...|topicN
    NOTE: Do not include any other text in your response.
    ---
    """
        + text
    )

    response = model.generate_content(prompt)
    arr = list(response.text.split("|"))
    return arr


# -----------------------------------------------------------------------------


def main():
    pass


# -----------------------------------------------------------------------------


if __name__ == "__main__":
    main()
