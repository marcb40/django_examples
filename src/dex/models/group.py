from dex.models.category import Category
from django.contrib.auth.models import User
from django.db import models
from django.db.models.fields.related import OneToOneField
from dex.models.featurette import Featurette


GROUP_TYPE = (
    ('PRIVATE','Private'),
    ('PUBLIC', 'Public'),
    ('ORGANIZATION', 'Organization'),
)

ORGANIZATION_STATUS = (
    ('PENDING', 'Pending'),
    ('APPROVED', 'Approved'),
    ('DENIED', 'Denied'),
)


class OrganizationGroup(models.Model):
    title = models.CharField(max_length=60, blank=False)
    summary = models.CharField(max_length=200, blank=False)
    group_type = models.CharField(max_length=20, blank=False, choices=GROUP_TYPE)
    allow_join_group = models.BooleanField()
    funder = models.BooleanField()
    date_created = models.DateField('Created', auto_now_add=True)
    last_updated = models.DateField('Updated', auto_now=True)
    org_status = models.CharField(max_length=20, blank=True, choices=ORGANIZATION_STATUS)
    
    user_affiliates = models.ManyToManyField(User, through='UserGroup')  #TODO: validation
    categories = models.ManyToManyField(Category)  #TODO: validation
    featurette = OneToOneField(Featurette, blank=True)

    class Meta:
        app_label = 'dex'
        
    def __unicode__(self):
        return self.title
    
    def __str__(self):
        return "id:" + str(self.id) + " title:" + self.title    