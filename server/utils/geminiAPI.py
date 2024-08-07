import os

import fitz

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")


def uploadPDF(file, file_type):
    return ["Dijkstras algorithm", "Floyd-warshall algorithm"]


def parse_pdf(pdf_path):
    # pdf_document = fitz.open(stream=pdf_file.read(), filetype='pdf')
    pdf_document = fitz.open(pdf_path)
    text = ""
    for page_num in range(pdf_document.page_count):
        page = pdf_document[page_num]
        text += page.get_text()
    return text


def main():
    pdf_path = "test_pdfs/DataScienceML.pdf"
    text = parse_pdf(pdf_path)

    with open("output_pdf.txt", "w") as file:
        file.write(text)


if __name__ == "__main__":
    main()
