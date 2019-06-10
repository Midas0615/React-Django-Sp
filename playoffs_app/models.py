from django.db import models

class League(models.Model):
    leagueName = models.CharField(max_length=255)
    league_logo_url = models.CharField(max_length=400)
    sport = models.CharField(max_length=255)
    #conferences = array String
    #divisions = array String
    #champions = array of objects, String and Number
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.leagueName

class Team(models.Model):
    teamName = models.CharField(max_length=255)
    team_logo_url = models.CharField(max_length=400)
    sport = models.CharField(max_length=255)
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='teams')
    # conference = models.CharField(max_length=255)
    # division = models.CharField(max_length=255)
    # championships = models.IntegerField()
    # or an array of Numbers
    wins = models.IntegerField()
    losses = models.IntegerField()
    # standing = models.CharField(max_length=10)
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.teamName

class Player(models.Model):
    playerName = models.CharField(max_length=255)
    player_photo_url = models.CharField(max_length=400)  
    sport = models.CharField(max_length=255)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, null=True, related_name='players')
    position = models.CharField(max_length=255)
    favorite = models.BooleanField(default=False)
    #stats = array of objects, String and String/Number

    def __str__(self):
        return self.playerName
