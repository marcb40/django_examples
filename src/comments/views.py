'''
Created on Apr 11, 2013

@author: mbianchini
'''
from comments.forms import CommentForm
from comments.models import Comment
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import render_to_response
from django.template.context import RequestContext


def add_comment(request):
    form = CommentForm(request.POST) # A form bound to the POST data
        
    entity_id = form.data['entity_id']
    content_type_id = form.data['content_type_id']
    current_user_id = form.data['current_user_id']
        
    if form.is_valid(): # All validation rules pass
        Comment.objects.create(comment=form.data['comment'], 
                                object_id=entity_id, 
                                content_type=ContentType.objects.get(pk=content_type_id), 
                                creator=User.objects.get(pk=current_user_id),
                                )

    comments = Comment.objects.get_by_id(entity_id, content_type_id)
    return render_to_response('comments/comment_list.html', {
        'type': form.data['type'],                                                   
        'form': form,
        'comments': comments,
    }, context_instance=RequestContext(request))