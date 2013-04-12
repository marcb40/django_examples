from dex.models.featurette import Featurette
from dex.models.group import OrganizationGroup
from django.contrib.auth.models import User
from django.db import models
from django.db.models.fields.related import OneToOneField
import comments

class Example(models.Model):
    title = models.CharField(max_length=60, blank=False)
    summary = models.CharField(max_length=200, blank=False)
    visible = models.BooleanField()
    
    date_created = models.DateField('Created', auto_now_add=True)
    last_updated = models.DateField('Updated', auto_now=True)
    
    groups = models.ManyToManyField(OrganizationGroup, through='ExampleGroup')
    user_affiliates = models.ManyToManyField(User, through='UserExample')
    
    class Meta:
        app_label = 'dex'
        
    def __unicode__(self):
        return self.title
    
    def __str__(self):
        return self.title

comments.register(Example)
