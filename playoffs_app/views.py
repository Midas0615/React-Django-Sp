from rest_framework import viewsets
from django.http import HttpResponse
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

import base64
import requests
from decouple import config

key = config('API_key')
password = config('password')

def send_nba_request(playerName):
    # code provided by MySportsFeeds API documentation at https://www.mysportsfeeds.com/data-feeds/api-docs/
    try:
        response = requests.get(
            # the link to the actual JSON file
            url="https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/cumulative_player_stats.json",
            params={
                # "player": name
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format(key,password).encode('utf-8')).decode('ascii')
            }
        )
        return HttpResponse(response, content_type='application/json')

        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))

    except requests.exceptions.RequestException:
        print('HTTP Request failed')

def send_nfl_request(playerName):
    # code provided by MySportsFeeds API documentation at https://www.mysportsfeeds.com/data-feeds/api-docs/
    try:
        response = requests.get(
            # the link to the actual JSON file
            url="https://api.mysportsfeeds.com/v1.2/pull/nfl/2018-regular/cumulative_player_stats.json",
            params={
                # "player": name
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format(key,password).encode('utf-8')).decode('ascii')
            }
        )
        return HttpResponse(response, content_type='application/json')

        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))

    except requests.exceptions.RequestException:
        print('HTTP Request failed')

def send_mlb_request(playerName):
    # code provided by MySportsFeeds API documentation at https://www.mysportsfeeds.com/data-feeds/api-docs/
    try:
        response = requests.get(
            # the link to the actual JSON file
            url="https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular/cumulative_player_stats.json",
            params={
                # "player": name
            },
            headers={
                "Authorization": "Basic " + base64.b64encode('{}:{}'.format(key,password).encode('utf-8')).decode('ascii')
            }
        )
        return HttpResponse(response, content_type='application/json')

        print('Response HTTP Status Code: {status_code}'.format(
            status_code=response.status_code))
        print('Response HTTP Response Body: {content}'.format(
            content=response.content))

    except requests.exceptions.RequestException:
        print('HTTP Request failed')