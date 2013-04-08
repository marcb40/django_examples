from dex.models.example import Example
from dex.models.group import OrganizationGroup
from django.db import models
'''
Created on Apr 8, 2013

@author: mbianchini
'''

EXAMPLE_GROUP_STATUS = (
    ('PENDING', 'Pending'),
    ('APPROVED', 'Approved'),
    ('DENIED', 'Denied'),
)

class ExampleGroup(models.Model):
    example = models.ForeignKey(Example)
    group = models.ForeignKey(OrganizationGroup)
    
    exampleStatus = models.CharField(max_length=20, null=True, choices=EXAMPLE_GROUP_STATUS) 
    groupStatus = models.CharField(max_length=20, null=True, choices=EXAMPLE_GROUP_STATUS)
    funder = models.BooleanField() 
    
    class Meta:
        app_label = 'dex'