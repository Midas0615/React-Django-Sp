from ohmysportsfeedspy import MySportsFeeds
from decouple import config

key = config('API_key')
password = config('password')

msf = MySportsFeeds(version="1.2")
msf.authenticate(key, password)

# output = msf.msf_get_data(league='nba',season='current',feed='cumulative_player_stats',format='json',player='stephen-curry')

# print(output['cumulativeplayerstats']['playerstatsentry'][0]['stats']['Fg3PtAttPerGame']['#text'])

# stat = output['cumulativeplayerstats']['playerstatsentry'][0]['stats']
# print(stat['Fg3PtAttPerGame']['#text'])

output = msf.msf_get_data(league='nfl',season='2018-regular',feed='cumulative_player_stats',format='json',player='cam-newton')

print(output)