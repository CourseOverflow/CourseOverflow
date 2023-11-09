from django.http import HttpResponse


def comment(request):
    return HttpResponse("<h1>Comment API</h1>")
