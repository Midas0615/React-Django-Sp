from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register('leagues', views.LeagueView)
router.register('teams', views.TeamView)
router.register('players', views.PlayerView)


urlpatterns = [
    path('', include(router.urls))
]