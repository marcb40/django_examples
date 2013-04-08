'''
Created on Apr 8, 2013

@author: mbianchini
'''
from core_examples.models.user import User
from django.db import models
from core_examples.models.group import OrganizationGroup

class UserGroup(models.Model):
    group = models.ForeignKey(OrganizationGroup)
    user = models.ForeignKey(User)
    
    affiliationType = models.CharField(max_length=20) 
    
    class Meta:
        app_label = 'core_examples'