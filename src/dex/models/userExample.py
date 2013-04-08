'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from dex.models.user import User
from django.db import models

class UserExample(models.Model):
    example = models.ForeignKey(Example)
    user = models.ForeignKey(User)
    
    affiliationType = models.CharField(max_length=20) 
    
    class Meta:
        app_label = 'dex'
