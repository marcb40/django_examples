from comments.forms import CommentForm, StarForm
from comments.models import CommentFlag
from django import template
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType

register = template.Library()

@register.inclusion_tag('comments/comments.html', takes_context=True)
def comments(context, entity):
    return {
        'entity': entity,
        'current_user_id' : User.objects.all()[0].id, ##TODO.  Temporary until user login is looked into
    }
    
@register.inclusion_tag('comments/comment_list.html', takes_context=True)
def comment_list(context):
    entity = context['entity']
    form = CommentForm(initial={'entity_id' : entity.id, 
                                'content_type_id' : ContentType.objects.get_for_model(entity).pk,
                                'current_user_id' : context['current_user_id'],
                                })
    return {
        'entity' : entity, 
        'current_user_id' : context['current_user_id'],
        'form': form,
    }
    
    
@register.inclusion_tag('comments/comment_details.html', takes_context=True)
def comment_details(context, c, show_reply):
    entity = context['entity']
    form = CommentForm(initial={'entity_id' : entity.id, 
                                'content_type_id' : ContentType.objects.get_for_model(entity).pk,
                                'current_user_id' : context['current_user_id'],
                                'reply_to_id': c.id,
                                })
    
    star_form = StarForm(initial={'comment_id' : c.id, 'current_user_id' : context['current_user_id']})
    
    return {
        'entity' : entity, 
        'current_user_id' : context['current_user_id'],
        'c': c,
        'details_form': form,
        'star_count' : len(c.commentflag_set.all()),
        'show_reply' : show_reply,
        'star_form' : star_form,
        
    }

@register.filter
def all_comments(entity):
    return entity.get_comments()

@register.filter
def child_comments(comment):
    return comment.children.all()

@register.simple_tag
def comment_count(entity):
    return entity.get_comment_count()

@register.simple_tag
def entity_type(entity):
    return ContentType.objects.get_for_model(entity).model

@register.simple_tag
def comment_creator(comment):
    return  comment.creator.first_name + " " + comment.creator.last_name

@register.simple_tag
def display_star_count(star_count):
    if (star_count > 0):
        return "inline"
    else:
        return "none"
    
@register.simple_tag
def star_count_people(star_count):
    if (star_count > 1):
        return "People"
    else:
        return "Person"
    
@register.simple_tag
def is_starred(comment, current_user_id):
    if ( CommentFlag.objects.filter(comment=comment, user=User.objects.get(pk=current_user_id))):
        return "checked"
    else:
        return ""