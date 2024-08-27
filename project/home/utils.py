import random
import string
from django.core.mail import send_mail


def generate_otp():
    return "".join(random.choices(string.digits, k=6))


def send_otp_email(email, otp_code):
    subject = "Your Health Connect OTP Code"
    message = f"Your OTP code is {otp_code}. It is valid for 10 minutes."
    send_mail(subject, message, "dapselio65@gmail.com", [email])
