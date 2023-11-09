from django.http import HttpResponse


def user(request):
    return HttpResponse("<h1>User API</h1>")
