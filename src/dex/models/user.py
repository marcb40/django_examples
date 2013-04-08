'''
Created on Apr 8, 2013

@author: mbianchini
'''
from django.db import models

class User(models.Model):
    username = models.CharField(max_length=20)
    passowrd = models.CharField(max_length=20)
    
    firstName =  models.CharField(max_length=50)
    lastName =  models.CharField(max_length=50)
    
    dateCreated = models.DateField()
    lastUpdated = models.DateField()
    
    enabled = models.BooleanField()
    accountExpired = models.BooleanField()
    accountLocked = models.BooleanField()
    passwordExpired = models.BooleanField()
    
    class Meta:
        app_label = 'dex'

    def __str__(self):
        return self.username
