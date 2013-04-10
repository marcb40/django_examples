'''
Created on Apr 9, 2013

@author: mbianchini
'''

from comments.models import Comment
from django.contrib.contenttypes.models import ContentType
from django.db import models


class ModelCommentManager(models.Manager):
    """
    A manager for retrieving tags for a particular model.
    """
    def get_query_set(self):
        ctype = ContentType.objects.get_for_model(self.model)
        return Comment.objects.filter(
            content_type__pk=ctype.pk).distinct()


class CommentDescriptor(object):
    """
    A descriptor which provides access to a ``ModelCommentManager`` for
    model classes and simple retrieval, updating and deletion of comments
    for model instances.
    """
    def __get__(self, instance, owner):
        if not instance:
            comment_manager = ModelCommentManager()
            comment_manager.model = owner
            return comment_manager
        else:
            return Comment.objects.get_for_object(instance)
 
    def __set__(self, instance, value):
        Comment.objects.add_comment(instance, value)

