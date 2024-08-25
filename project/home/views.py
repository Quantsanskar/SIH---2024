from django.shortcuts import render


# Create your views here.
def index(request):
    return render(request, "index.html")


def register(request):
    if request.method == "POST":
        response = request.get("http://127.0.0.1:8000/api/register/")
        print(response)
    return render(request, "register.html")


def login(request):
    return render(request, "login.html")

def patient_portal(request):
    return render(request,"patient_portal.html")
