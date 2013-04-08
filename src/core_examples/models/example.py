from core_examples.models.group import OrganizationGroup
from django.db import models

class Example(models.Model):
    title = models.CharField(max_length=60)
    summary = models.CharField(max_length=200)
    visible = models.BooleanField()
    dateCreated = models.DateField()
    lastUpdated = models.DateField()
    
    groups = models.ManyToManyField(OrganizationGroup, through='ExampleGroup')

    class Meta:
        app_label = 'core_examples'

