import base64
import requests
from decouple import config

key = config('API_key')
password = config('password')

playerName = 'lebron james'
name = playerName.split()[0] + "-" + playerName.split()[1]

response = requests.get(
    url="https://api.mysportsfeeds.com/v1.2/pull/nba/2018-2019-regular/cumulative_player_stats.json",
    params={
        
    },
    headers={
        "Authorization": "Basic " + base64.b64encode('{}:{}'.format(key,password).encode('utf-8')).decode('ascii')
    }
)

print(response.json())

# stats = response.json()['cumulativeplayerstats']['playerstatsentry'][0]['stats']

# category = stats['Fg3PtAttPerGame']['@category']
# stat = stats['Fg3PtAttPerGame']['#text']

# # could use 'for x in stats_array' to print multple categories and stats

# stats_array = ['GamesPlayed','PtsPerGame','Fg2PtPct','Fg3PtPct','RebPerGame','AstPerGame','StlPerGame','BlkPerGame']

# for x in stats_array:
#     print(stats[x]['@abbreviation'])
#     print(stats[x]['#text'])