'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from dex.models.user import User
from django.db import models

EXAMPLE_AFFILIATION_TYPE = (

    ('ADMIN', 'Administrator'), 
    ('MEMBER', 'Member'),
    ('FOLLOWER', 'Follower'),
    ('INSPIRED_BY', 'Inspired By'),
)


class UserExample(models.Model):
    example = models.ForeignKey(Example)
    user = models.ForeignKey(User)
    
    affiliationType = models.CharField(max_length=20, null=False, choices=EXAMPLE_AFFILIATION_TYPE) 
    
    class Meta:
        app_label = 'dex'
