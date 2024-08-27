from django.contrib import admin
from .models import Patient

# Register your models here.


class PatientAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "👤 Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "email",
                    "password",
                    "date_of_birth",
                    "gender",
                )
            },
        ),
        (
            "📞 Contact Details",
            {"fields": ("mobile_number", "address", "emergency_contact")},
        ),
        (
            "🩺 Medical Information",
            {
                "fields": (
                    "blood_group",
                    "allergies",
                    "current_medications",
                    "past_medical_history",
                    "family_medical_history",
                )
            },
        ),
        (
            "🏋️ Lifestyle Information",
            {
                "fields": (
                    "smoking",
                    "alcohol",
                    "exercise_frequency",
                    "dietary_restrictions",
                    "occupation",
                )
            },
        ),
        (
            "💼 Insurance Information",
            {"fields": ("insurance_provider", "insurance_number")},
        ),
        ("OTP", {"fields": ("otp_code",)}),
    )

    list_display = ("first_name", "last_name", "email", "mobile_number")
    search_fields = ("first_name", "last_name", "email", "mobile_number")


admin.site.register(Patient, PatientAdmin)
