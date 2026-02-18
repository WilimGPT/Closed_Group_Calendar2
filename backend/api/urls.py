from django.urls import path
from .views import (
    language_data,
    add_availability,
    update_availability,
    delete_availability,
    book_course,
    update_course
)

urlpatterns = [
    path("<str:language>/", language_data),

    # Availability CRUD
    path("<str:language>/add-availability/", add_availability),
    path("<str:language>/update-availability/", update_availability),
    path("<str:language>/delete-availability/", delete_availability),

    # Course CRUD
    path("<str:language>/book/<str:teacherId>", book_course),
    path("<str:language>/update-course/<str:courseId>", update_course),
]
