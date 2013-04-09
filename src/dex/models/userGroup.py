'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.group import OrganizationGroup
from django.contrib.auth.models import User
from django.db import models

class UserGroup(models.Model):
    group = models.ForeignKey(OrganizationGroup)
    user = models.ForeignKey(User)
    
    affiliationType = models.CharField(max_length=20) 
    
    class Meta:
        app_label = 'dex'