from django.shortcuts import render, redirect
from . import models
from django.contrib import messages
from django.contrib.auth.hashers import make_password, check_password
from .models import Patient
from .utils import generate_otp, send_otp_email, generate_content


# Create your views here.
def index(request):
    return render(request, "index.html")


def register(request):
    if request.method == "POST":
        first_name = request.POST.get("firstName")
        last_name = request.POST.get("lastName")
        email = request.POST.get("email")
        password = request.POST.get("password")
        confirm_password = request.POST.get("confirmPassword")
        date_of_birth = request.POST.get("dateOfBirth")
        gender = request.POST.get("gender")
        mobile_number = request.POST.get("phoneNumber")
        address = request.POST.get("address")
        emergency_contact = request.POST.get("emergencyContact")
        blood_group = request.POST.get("bloodType")
        allergies = request.POST.get("allergies")
        current_medications = request.POST.get("currentMedications")
        past_medical_history = request.POST.get("pastMedicalHistory")
        family_medical_history = request.POST.get("familyMedicalHistory")
        smoking = request.POST.get("smoking")
        alcohol = request.POST.get("alcohol")
        exercise_frequency = request.POST.get("exercise")
        dietary_restrictions = request.POST.get("dietaryRestrictions")
        occupation = request.POST.get("occupation")
        insurance_provider = request.POST.get("insuranceProvider")
        insurance_number = request.POST.get("insuranceNumber")

        if password != confirm_password:
            messages.error(request, "Passwords do not match")
            return redirect("register")

        if models.Patient.objects.filter(email=email).exists():
            messages.error(request, "Email already exists")
            return redirect("register")

        hashed_password = make_password(password)

        otp_code = generate_otp()
        send_otp_email(email, otp_code)

        patient = models.Patient(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_password,
            date_of_birth=date_of_birth,
            gender=gender,
            mobile_number=mobile_number,
            address=address,
            emergency_contact=emergency_contact,
            blood_group=blood_group,
            allergies=allergies,
            current_medications=current_medications,
            past_medical_history=past_medical_history,
            family_medical_history=family_medical_history,
            smoking=smoking,
            alcohol=alcohol,
            exercise_frequency=exercise_frequency,
            dietary_restrictions=dietary_restrictions,
            occupation=occupation,
            insurance_provider=insurance_provider,
            insurance_number=insurance_number,
            otp_code=otp_code,
        )
        print(otp_code, "\n\n")
        request.session["patient_data"] = {
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": hashed_password,
            "date_of_birth": date_of_birth,
            "gender": gender,
            "mobile_number": mobile_number,
            "address": address,
            "emergency_contact": emergency_contact,
            "blood_group": blood_group,
            "allergies": allergies,
            "current_medications": current_medications,
            "past_medical_history": past_medical_history,
            "family_medical_history": family_medical_history,
            "smoking": smoking,
            "alcohol": alcohol,
            "exercise_frequency": exercise_frequency,
            "dietary_restrictions": dietary_restrictions,
            "occupation": occupation,
            "insurance_provider": insurance_provider,
            "insurance_number": insurance_number,
            "otp_code": otp_code,
        }

        return redirect("verify_otp")

    return render(request, "register.html")


def verify_otp(request):
    if request.method == "POST":
        otp_code = request.POST.get("otp_code")

        if not otp_code:
            messages.error(request, "OTP code is required.")
            return render(request, "otp_page.html")

        try:

            if otp_code == request.session.get("patient_data")["otp_code"]:
                patient_data = request.session.pop("patient_data", None)
                if patient_data:
                    patient = Patient(**patient_data)
                    patient.save()
                messages.success(
                    request, "Email verified successfully. You can now log in."
                )
                return redirect("login")
            else:
                messages.error(request, "Invalid or expired OTP.")
        except:
            messages.error(request, "There Is An Error!")

    return render(request, "otp_page.html")


def login(request):
    if request.method == "POST":
        email = request.POST.get("email")
        password = request.POST.get("password")
        try:
            patient = models.Patient.objects.get(email=email)
            if check_password(password, patient.password):
                request.session["patient_id"] = patient.id
                return redirect("patient_portal")
            else:
                messages.error(request, "Invalid Password")
        except models.Patient.DoesNotExist:
            messages.error(request, "Invalid Username or Password!")

    return render(request, "login.html")


def patient_portal(request):
    if "patient_id" not in request.session:
        return redirect("login")
    
    if request.method == "POST":
        report_text = request.POST.get("report-text")
        print(report_text)
        file = request.FILES.get("file-upload")
        analysis_type = request.POST.get("analysis-type")
        
        data = models.HealthReport(report_text = report_text, file = file, analysis_type = analysis_type)
        data.save()
        return redirect("patient_portal")

    return render(request, "patient_portal.html")


def logout(request):
    request.session.flush()
    messages.success(request, "You have been logged out successfully.")
    return redirect("login")


def health_assis(request):
    if request.method == "POST":
        name = request.POST.get("name")
        age = request.POST.get("age")
        gender = request.POST.get("gender")
        height = request.POST.get("height")
        weight = request.POST.get("weight")
        occupation = request.POST.get("occupation")
        exercise = request.POST.get("exercise")
        diet = request.POST.get("diet")
        medicalConditions = request.POST.get("medicalConditions")
        stress = request.POST.get("stress")

        
        prompt_text = f"""Based on the following health information, provide personalized recommendations for a diet plan, meal recipes, health precautions, and safety guidelines. Include specific advice from WHO guidelines where applicable. Here's the patient information:

    Age: {age}
    Gender: {gender}
    Height: {height} cm
    Weight: {weight} kg
    Occupation: {occupation}
    Exercise Frequency: {exercise}
    Current Diet: {diet}
    Medical Conditions: {medicalConditions}
    Stress Level: {stress}

    Please provide detailed recommendations in the following format:
    1. Diet Plan:
    2. Meal Recipes in details like how to prepare it from scratch:
    3. Health Precautions:
    4. Safety Guidelines:
    And specially provide the current diease pattern accoding to who data from which maximum patient are suffering and
    always generate an unique and engazing article to educate the user about the same
    Also suggest home remedy or general household methods to cure the current medical condition of the user 
    And provide the meal recipies and diet plan in details and try to suggest the easily aavailable meal spcially in India
     """
        gemini_response = generate_content(prompt_text)
        gemini_response = gemini_response["candidates"][0]["content"]["parts"][0]["text"]
        output = ""
        for i in gemini_response:
            if i != "*" and i != "#":
                output += i
        data = models.PersonalAssistant(name = name, age = age, gender = gender, height = height, weight = weight, occupation = occupation, exercise = exercise, diet = diet, medicalConditions = medicalConditions, stress = stress, reccomendations = output)
        data.save()

        return render(request, "recommendation.html", {"output": output})
        

    return render(request, "healthAssistant.html")


def contact(request):
    if request.method == "POST":
        name = request.POST.get("name")
        email = request.POST.get("email")
        message = request.POST.get("message")

        data = models.Contact(name = name, email = email, message = message)
        data.save()

    return render(request, "contact.html")
