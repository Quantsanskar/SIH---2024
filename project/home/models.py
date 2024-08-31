from django.db import models
from django.utils import timezone
import pytz, uuid

# Create your models here.


class Patient(models.Model):
    pid = models.UUIDField(
        default=uuid.uuid4, editable=False, unique=True, null=True, blank=True
    )
    first_name = models.CharField(max_length=256)
    last_name = models.CharField(max_length=256)
    email = models.EmailField(max_length=256, unique=True)
    password = models.CharField(max_length=256)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=256)
    mobile_number = models.CharField(max_length=10, null=True, blank=True)
    address = models.TextField()
    emergency_contact = models.CharField(max_length=10)
    blood_group = models.CharField(max_length=32)
    allergies = models.TextField(blank=True, null=True)
    current_medications = models.TextField(blank=True, null=True)
    past_medical_history = models.TextField(blank=True, null=True)
    family_medical_history = models.TextField(blank=True, null=True)
    smoking = models.CharField(max_length=32, null=True, blank=True)
    alcohol = models.CharField(max_length=32, null=True, blank=True)
    exercise_frequency = models.CharField(max_length=64, null=True, blank=True)
    dietary_restrictions = models.TextField(blank=True, null=True)
    occupation = models.CharField(max_length=256, null=True, blank=True)
    insurance_provider = models.CharField(max_length=64, null=True, blank=True)
    insurance_number = models.CharField(max_length=64, null=True, blank=True)
    otp_code = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(
        default=timezone.now().astimezone(pytz.timezone("Asia/Kolkata")),
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class HealthReport(models.Model):
    report_text = models.TextField(null=True,blank=True)
    file = models.FileField(upload_to='uploads/')
    analysis_type = models.CharField(max_length=256,null=True,blank=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.file.name


class Contact(models.Model):
    name = models.CharField(max_length=256,blank=True,null=True)
    email = models.EmailField()
    message = models.TextField()

    def __str__(self):
        return self.name
    
class PersonalAssistant(models.Model):
    name = models.CharField(max_length=256,blank=True,null=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=32)
    height = models.IntegerField()
    weight = models.IntegerField()
    occupation = models.CharField(max_length=256,null=True,blank=True)
    exercise = models.CharField(max_length=32)
    diet = models.CharField(max_length=256)
    medicalConditions = models.TextField()
    stress = models.CharField(max_length=32)
    reccomendations = models.TextField(null=True,blank=True)

    def __str__(self):
        return self.name
    
class ChatBot(models.Model):
    pass

class AnalyzedReport(models.Model):
    report = models.ForeignKey(HealthReport,on_delete=models.CASCADE)
    analysis = models.TextField()
    analyzed_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.report.file.name