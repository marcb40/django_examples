'''
Created on Apr 8, 2013

@author: mbianchini
'''
from django.db import models

class User(models.Model):
    user_name = models.CharField(max_length=20, blank=False)
    password = models.CharField(max_length=20, blank=False)
    
    first_name =  models.CharField(max_length=50, blank=False)
    last_name =  models.CharField(max_length=50, blank=False)
    
    date_created = models.DateField('Created', auto_now_add=True)
    last_updated = models.DateField('Updated', auto_now=True)
    
    enabled = models.BooleanField()
    account_expired = models.BooleanField()
    account_locked = models.BooleanField()
    password_expired = models.BooleanField()
    
    class Meta:
        app_label = 'dex'

    def __str__(self):
        return self.username
