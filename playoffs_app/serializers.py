from rest_framework import serializers

from .models import League, Team, Player

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'playerName', 'player_photo_url', 'sport', 'team', 'favorite')

class TeamSerializer(serializers.ModelSerializer):
    players = PlayerSerializer(many=True, read_only=True)
    class Meta:
        model = Team
        fields = ('id', 'teamName', 'team_logo_url', 'sport', 'players', 'league', 'wins', 'losses', 'favorite')

class LeagueSerializer(serializers.ModelSerializer):
    teams = TeamSerializer(many=True, read_only=True)
    class Meta:
        model = League
        fields = ('id', 'leagueName', 'league_logo_url', 'sport', 'teams','favorite')



