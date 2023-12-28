from django.urls import path
from . import views

urlpatterns = [
    path('get-draft/', views.get_draft, name='get_draft'),
    path('get-all-drafts/', views.get_all_drafts, name='get_all_drafts'),
    path('update-draft/', views.update_draft, name='update_draft'),
    path('delete-draft/', views.delete_draft, name='delete_draft'),
    path('fetch-videos/', views.fetch_videos, name='fetch_videos'),
]
