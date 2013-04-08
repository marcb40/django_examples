'''
Created on Apr 8, 2013

@author: mbianchini
'''
from core_examples.models.user import User
from django.db import models
from django.db.models.fields.related import OneToOneField

class Profile(models.Model):
    workplace = models.CharField(max_length=200)
    department = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=20)
    biography = models.CharField(max_length=800)
    
    dateCreated = models.DateField()
    lastUpdated = models.DateField()
    
    includeOnAbout = models.BooleanField()
    
    user = OneToOneField(User)

    class Meta:
        app_label = 'core_examples'
        
    def __str__(self):
        return self.user.username