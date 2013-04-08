from django.db import models

class Category(models.Model):
    name = models.CharField(max_length=60, blank=False)
    active = models.BooleanField(default=True)
    required = models.BooleanField(default=False)
    parent_category = models.ForeignKey('self', null=True, blank=True)
    rank = models.IntegerField()
    
    def __unicode__(self):
        return self.name
    
    def __str__(self):
        return self.name

    class Meta:
        app_label = 'dex'
        