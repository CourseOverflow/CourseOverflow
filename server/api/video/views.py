from django.http import HttpResponse


def video(request):
    return HttpResponse("<h1>Video API</h1>")
