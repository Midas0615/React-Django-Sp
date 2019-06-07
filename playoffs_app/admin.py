from django.contrib import admin
from .models import League, Team, Player

admin.site.register([League, Team, Player])
