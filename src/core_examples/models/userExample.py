'''
Created on Apr 8, 2013

@author: mbianchini
'''
from core_examples.models.example import Example
from core_examples.models.user import User
from django.db import models

class UserExample(models.Model):
    example = models.ForeignKey(Example)
    user = models.ForeignKey(User)
    
    affiliationType = models.CharField(max_length=20) 
    
    class Meta:
        app_label = 'core_examples'
