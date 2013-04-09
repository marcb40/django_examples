'''
Created on Apr 8, 2013

@author: mbianchini
'''
from django.contrib.auth.models import User
from django.db import models
from django.db.models.fields.related import OneToOneField

class Profile(models.Model):
    workplace = models.CharField(max_length=200, blank=False)
    department = models.CharField(max_length=200, blank=True)
    city = models.CharField(max_length=100, blank=False)
    state = models.CharField(max_length=20, blank=False)
    biography = models.CharField(max_length=800, blank=False)
    
    date_created = models.DateField('Created', auto_now_add=True)
    last_updated = models.DateField('Updated', auto_now=True)
    
    includeOnAbout = models.BooleanField()
    
    user = OneToOneField(User)

    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return self.user.username
