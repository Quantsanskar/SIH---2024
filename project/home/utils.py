import random
import string
import requests
from django.core.mail import send_mail
import PyPDF2
import json
import re

def generate_otp():
    return "".join(random.choices(string.digits, k=6))


def send_otp_email(email, otp_code):
    subject = "Your Health Connect OTP Code"
    message = f"Your OTP code is {otp_code}. It is valid for 10 minutes."
    send_mail(subject, message, "dapselio65@gmail.com", [email])




def generate_content(prompt_text):
    api_key = "AIzaSyDayOQRavI4uxYYtKw_j1AuL90PPGI9U2A"
    url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent'
    headers = {
        'Content-Type': 'application/json',
    }
    data = {
        "contents": [
            {
                "parts": [
                    {
                        "text": prompt_text
                    }
                ]
            }
        ]
    }
    params = {
        'key': api_key
    }

    try:
        response = requests.post(url, headers=headers, json=data, params=params)
        
        if response.status_code == 200:
            return response.json()  # Returns the response data as a Python dictionary
        else:
            return {
                "status_code": response.status_code,
                "error": response.text
            }
    except requests.RequestException as e:
        return {"error": str(e)}





def extract_text_from_pdf(file_path):
    pdf_file_obj = open(file_path, 'rb')
    pdf_reader = PyPDF2.PdfReader(pdf_file_obj) # Use PdfReader instead of PdfFileReader
    num_pages = len(pdf_reader.pages) # get num_pages using len(pdf_reader.pages)
    text = ''
    for page in range(num_pages):
        page_obj = pdf_reader.pages[page] # Access pages using pdf_reader.pages[page]
        text += page_obj.extract_text()
    pdf_file_obj.close()
    return text


def format_stars(text):
    out = ""
    for i in text:
        if i != "*" and i != "#":
            out += i



def format_response(text):
    # Split the text into sections
    sections = re.split(r'\d+\.', text)[1:]  # Remove the empty first element
    formatted_sections = []

    for section in sections:
        # Remove leading/trailing whitespace
        section = section.strip()

        # Split the section title from the content
        title, content = section.split(':', 1)

        # Format the section
        formatted_section = f"<h2>{title.strip()}</h2>"

        # Split content into paragraphs and format them
        paragraphs = content.strip().split('\n')
        formatted_paragraphs = [
            f"<p>{p.strip()}</p>" for p in paragraphs if p.strip()]

        formatted_section += '\n'.join(formatted_paragraphs)
        formatted_sections.append(formatted_section)

    return '\n'.join(formatted_sections)


def remove_star(text):
    text = text.replace('#', '')
    return text.replace('*', '')



