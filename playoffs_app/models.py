from django.db import models

class League(models.Model):
    leagueName = models.CharField(max_length=255)
    league_logo_url = models.CharField(max_length=400)
    sport = models.CharField(max_length=255)
    #teams = Foreign Key? object String
    #conferences = object String
    #divisions = object String
    #champions = object String
    #favorite = models.BooleanField()

    def __str__(self):
        return self.leagueName

class Team(models.Model):
    teamCity = models.CharField(max_length=255)
    teamName = models.CharField(max_length=255)
    team_logo_url = models.CharField(max_length=400)
    sport = models.CharField(max_length=255)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='teams')
    conference = models.CharField(max_length=255)
    division = models.CharField(max_length=255)
    championships = IntegerField(max_length=3)
    wins = models.IntegerField(max_length=3)
    losses = models.IntegerField(max_length=3)
    standing = models.CharField(max_length=10)
    #players = Foreign Key? object String
    favorite = models.BooleanField()

    def __str__(self):
        return self.teamName

class Player(models.Model):
    playerName = models.CharField(max_length=255)
    player_photo_url = models.CharField(max_length=400)
    #teamCity = branch off of foreign key? String
    #teamName = branch off of foreign key? String    
    sport = models.CharField(max_length=255)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='players')
    position = models.CharField(max_length=255)
    favorite = models.BooleanField()
    #stats = object String

    def __str__(self):
        return self.playerName
