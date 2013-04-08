from core_examples.models.group import OrganizationGroup
from core_examples.models.user import User
from django.db import models

class Example(models.Model):
    title = models.CharField(max_length=60)
    summary = models.CharField(max_length=200)
    visible = models.BooleanField()
    date_created = models.DateField()
    last_updated = models.DateField()
    
    groups = models.ManyToManyField(OrganizationGroup, through='ExampleGroup')
    user_affiliates = models.ManyToManyField(User, through='UserExample')

    class Meta:
        app_label = 'core_examples'
        
    def __str__(self):
        return self.title

