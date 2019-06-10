from rest_framework import serializers

from .models import League, Team, Player

class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ('id', 'leagueName', 'league_logo_url', 'sport')
    
class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ('id', 'teamCity', 'teamName', 'team_logo_url', 'sport', 'league', 'conference', 'division', 'championships', 'wins', 'losses', 'standing', 'favorite')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('id', 'playerName', 'player_photo_url', 'sport', 'league', 'position', 'favorite')