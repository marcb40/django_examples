'''
Created on Apr 9, 2013

@author: mbianchini
'''
from django.contrib.auth.models import User
from django.db import models

class Comment(models.Model):
    comment = models.CharField(max_length=300, blank=False)
    original = models.ForeignKey('self', related_name="all_children")
    parent = models.ForeignKey('self', related_name="immediate_children")
    
    creator = models.ForeignKey(User)
    
    date_created = models.DateField('Created', auto_now_add=True)
    last_updated = models.DateField('Updated', auto_now=True)
    
    type = models.CharField(max_length=20, blank=False)
    
    class Meta:
        app_label = 'comments'
        
    def __unicode__(self):
        return self.comment
    
    def __str__(self):
        return self.comment
    
class CommentRanking(models.Model):
    user = models.ForeignKey(User)
    comment = models.ForeignKey(Comment)
    
    class Meta:
        app_label = 'comments'