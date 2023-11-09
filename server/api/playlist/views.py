from django.http import HttpResponse


def playlist(request):
    return HttpResponse("<h1>Playlist API</h1>")
