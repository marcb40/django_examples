'''
Created on Apr 11, 2013

@author: mbianchini
'''
from comments.forms import CommentForm, StarForm
from comments.models import Comment, CommentFlag
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.http.response import HttpResponse
from django.shortcuts import render_to_response
from django.template.context import RequestContext


def add_comment(request):
    form = CommentForm(request.POST) # A form bound to the POST data
        
    entity_id = form.data['entity_id']
    content_type_id = form.data['content_type_id']
    current_user_id = form.data['current_user_id']
    reply_to_id = form.data['reply_to_id']
    
            
    comment = Comment.objects.create(comment=form.data['comment'], 
                                object_id=entity_id, 
                                content_type=ContentType.objects.get(pk=content_type_id), 
                                creator=User.objects.get(pk=current_user_id),
                                parent=(None if reply_to_id == "" else Comment.objects.get(pk=reply_to_id)))
       
    form = CommentForm(initial={'entity_id' : entity_id, 
                                'content_type_id' : content_type_id,
                                'current_user_id' : current_user_id,
                                }) 
        
    
    return render_to_response('comments/comment_list.html', {
        'entity' : comment.object,
        'current_user_id' : current_user_id,
        'form': form,
    }, context_instance=RequestContext(request))
    
def like_comment(request):
    star_form = StarForm(request.POST) # A form bound to the POST data
        
    comment_id = star_form.data['comment_id']
    current_user_id = star_form.data['current_user_id']
    comment = Comment.objects.get(pk=comment_id)
    
    CommentFlag.objects.get_or_create(comment=comment, user=User.objects.get(pk=current_user_id))
    
    return HttpResponse(comment.commentflag_set.all().count())

def unlike_comment(request):
    star_form = StarForm(request.POST) # A form bound to the POST data
        
    comment_id = star_form.data['comment_id']
    current_user_id = star_form.data['current_user_id']
    comment = Comment.objects.get(pk=comment_id)
    
    comment_flag = CommentFlag.objects.get(comment=comment, user=User.objects.get(pk=current_user_id))
    comment_flag.delete()
    
    return HttpResponse(comment.commentflag_set.all().count())