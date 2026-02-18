from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')


def get_language_file(language):
    return os.path.join(DATA_DIR, f"{language}.json")


@csrf_exempt
@require_http_methods(["GET", "POST"])
def language_data(request, language):
    file_path = get_language_file(language)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    if request.method == "GET":
        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return JsonResponse(data, safe=False)

    if request.method == "POST":
        try:
            body = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(body, f, indent=2)

        return JsonResponse({"status": "saved"})


@csrf_exempt
@require_http_methods(["POST"])
def add_availability(request, language):
    file_path = get_language_file(language)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    try:
        body = json.loads(request.body.decode("utf-8"))
        teacher_id = body["teacherId"]
        slot = body["slot"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacher_id), None)

    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    teacher["availabilitySlots"].append(slot)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "availability added"})


@csrf_exempt
@require_http_methods(["POST"])
def update_availability(request, language):
    file_path = get_language_file(language)

    try:
        body = json.loads(request.body.decode("utf-8"))
        teacher_id = body["teacherId"]
        slot_id = body["slotId"]
        updated_slot = body["updatedSlot"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacher_id), None)
    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    slot = next((s for s in teacher["availabilitySlots"] if s["id"] == slot_id), None)
    if not slot:
        return JsonResponse({"error": "Slot not found"}, status=404)

    # Keep ID stable
    updated_slot["id"] = slot_id
    teacher["availabilitySlots"] = [
        updated_slot if s["id"] == slot_id else s for s in teacher["availabilitySlots"]
    ]

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "availability updated"})


@csrf_exempt
@require_http_methods(["POST"])
def delete_availability(request, language):
    file_path = get_language_file(language)

    try:
        body = json.loads(request.body.decode("utf-8"))
        teacher_id = body["teacherId"]
        slot_id = body["slotId"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacher_id), None)
    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    before = len(teacher["availabilitySlots"])
    teacher["availabilitySlots"] = [
        s for s in teacher["availabilitySlots"] if s.get("id") != slot_id
    ]

    after = len(teacher["availabilitySlots"])

    if before == after:
        return JsonResponse({"error": "Slot not found"}, status=404)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "availability deleted"})


@csrf_exempt
@require_http_methods(["POST"])
def book_course(request, language, teacherId):
    file_path = get_language_file(language)

    try:
        payload = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    teacher = next((t for t in data["teachers"] if t["id"] == teacherId), None)

    if not teacher:
        return JsonResponse({"error": "Teacher not found"}, status=404)

    # Generate new course ID
    new_id = f"{teacherId}_b{len(teacher['bookings']) + 1}"

    new_course = {
        "id": new_id,
        "groupReference": payload["groupReference"],
        "timeZone": payload["timeZone"],
        "durationMinutes": payload["durationMinutes"],
        "sessions": payload["sessions"]
    }

    teacher["bookings"].append(new_course)

    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "course booked", "courseId": new_id})


@csrf_exempt
@require_http_methods(["POST"])
def update_course(request, language, courseId):
    file_path = get_language_file(language)

    if not os.path.exists(file_path):
        return JsonResponse({"error": "Language not found"}, status=404)

    try:
        payload = json.loads(request.body.decode("utf-8"))
        new_teacher_id = payload["teacherId"]
    except Exception:
        return JsonResponse({"error": "Invalid payload"}, status=400)

    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    # -------------------------------------------------------
    # 1. FIND ORIGINAL TEACHER CONTAINING THIS COURSE
    # -------------------------------------------------------
    original_teacher = None
    original_course = None

    for teacher in data["teachers"]:
        for c in teacher.get("bookings", []):
            if c["id"] == courseId:
                original_teacher = teacher
                original_course = c
                break
        if original_course:
            break

    if not original_course:
        return JsonResponse({"error": "Course not found"}, status=404)

    # -------------------------------------------------------
    # 2. REMOVE COURSE FROM ORIGINAL TEACHER
    # -------------------------------------------------------
    original_teacher["bookings"] = [
        c for c in original_teacher["bookings"] if c["id"] != courseId
    ]

    # -------------------------------------------------------
    # 3. ADD / UPDATE UNDER NEW TEACHER
    # -------------------------------------------------------
    new_teacher = next((t for t in data["teachers"] if t["id"] == new_teacher_id), None)

    if not new_teacher:
        return JsonResponse({"error": "New teacher not found"}, status=404)

    updated_course = {
        "id": courseId,  # keep stable
        "groupReference": payload["groupReference"],
        "timeZone": payload["timeZone"],
        "durationMinutes": payload["durationMinutes"],
        "sessions": payload["sessions"]
    }

    new_teacher["bookings"].append(updated_course)

    # -------------------------------------------------------
    # 4. SAVE FILE
    # -------------------------------------------------------
    with open(file_path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    return JsonResponse({"status": "course updated"})
