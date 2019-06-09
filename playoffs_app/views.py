from rest_framework import viewsets

from .serializers import LeagueSerializer, TeamSerializer, PlayerSerializer
from .models import League, Team, Player


class LeagueView(viewsets.ModelViewSet):
    queryset = League.objects.all()
    serializer_class = LeagueSerializer

class TeamView(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class PlayerView(viewsets.ModelViewSet):
    queryset = Player.objects.all()
    serializer_class = PlayerSerializer