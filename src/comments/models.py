'''
Created on Apr 9, 2013

@author: mbianchini
'''
from django.contrib.auth.models import User
from django.contrib.contenttypes import generic
from django.contrib.contenttypes.models import ContentType
from django.db import models

class CommentManager(models.Manager):

    def add_comment(self, obj, comment):
        ctype = ContentType.objects.get_for_model(obj)
        comment.content_type = ctype
        comment.object_id=obj.pk
        comment.save()

    def get_for_object(self, obj):
        """
        Create a queryset matching all comments associated with the given
        object.
        """
        ctype = ContentType.objects.get_for_model(obj)
        return self.filter(content_type__pk=ctype.pk,
                           object_id=obj.pk, parent=None)
    
    def get_by_id(self, entity_id, content_type_id):
        """
        Create a queryset matching all comments associated with the id.
        """
        return self.filter(content_type__pk=content_type_id,
                           object_id=entity_id, parent=None)
   
    def get_comment_count(self, obj):
        ctype = ContentType.objects.get_for_model(obj)
        return self.filter(content_type__pk=ctype.pk,
                           object_id=obj.pk).count()
        
    def get_comment_count_by_id(self, entity_id, content_type_id):
        return self.filter(content_type__pk=content_type_id,
                           object_id=entity_id).count()



class Comment(models.Model):
    comment = models.CharField(max_length=300, blank=False)
    content_type = models.ForeignKey(ContentType, verbose_name='content type')
    object_id = models.PositiveIntegerField('object id', db_index=True)
    object = generic.GenericForeignKey('content_type', 'object_id')
    
    parent = models.ForeignKey('self', related_name="children", null=True)
    creator = models.ForeignKey(User, null=True)
    
    date_created = models.DateField('Created', auto_now_add=True)
    last_updated = models.DateField('Updated', auto_now=True)
    
    type = models.CharField(max_length=20, blank=True)
    
    objects = CommentManager()
    
    class Meta:
        app_label = 'comments'
        
    def __unicode__(self):
        return self.comment[0:15]
    
    def __str__(self):
        return self.comment[0:15]
    
class CommentFlag(models.Model):
    user = models.ForeignKey(User)
    comment = models.ForeignKey(Comment)
    
    class Meta:
        app_label = 'comments'
        
