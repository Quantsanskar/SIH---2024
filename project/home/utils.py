import random
import string
import requests
from django.core.mail import send_mail


def generate_otp():
    return "".join(random.choices(string.digits, k=6))


def send_otp_email(email, otp_code):
    subject = "Your Health Connect OTP Code"
    message = f"Your OTP code is {otp_code}. It is valid for 10 minutes."
    send_mail(subject, message, "dapselio65@gmail.com", [email])


import requests
import json

def generate_content(prompt_text):
    api_key = "AIzaSyDnzM3GQINumQkNK1q2Azv3LAVo-YWX76w"
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



