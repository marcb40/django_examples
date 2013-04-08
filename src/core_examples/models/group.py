from core_examples.models.user import User
from django.db import models

class OrganizationGroup(models.Model):
    title = models.CharField(max_length=60)
    summary = models.CharField(max_length=200)
    groupType = models.CharField(max_length=20)
    allowJoinGroup = models.BooleanField()
    funder = models.BooleanField()
    dateCreated = models.DateField()
    lastUpdated = models.DateField()
    orgStatus = models.CharField(max_length=20)
    
    userAffiliates = models.ManyToManyField(User, through='UserGroup')

    class Meta:
        app_label = 'core_examples'