from dex.models.example import Example
from dex.models.group import OrganizationGroup
from django.db import models
'''
Created on Apr 8, 2013

@author: mbianchini
'''
class ExampleGroup(models.Model):
    example = models.ForeignKey(Example)
    group = models.ForeignKey(OrganizationGroup)
    
    exampleStatus = models.CharField(max_length=20) 
    groupStatus = models.CharField(max_length=20)
    funder = models.BooleanField() 
    
    class Meta:
        app_label = 'dex'