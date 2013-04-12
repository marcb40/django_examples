from comments.forms import CommentForm
from comments.models import Comment
from django import template
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType

register = template.Library()

@register.inclusion_tag('comments/comments.html', takes_context=True)
def comments(context, entity):
    ctype = ContentType.objects.get_for_model(entity)
    
    return {
        'entity_id': entity.id,
        'content_type_id' : ctype.pk,
        'current_user_id' : User.objects.all()[0].id,
        'type': ctype.model,
        'comments': entity.get_comments(),
        'comment_count': entity.get_comment_count(),
    }



@register.inclusion_tag('comments/comment_list.html', takes_context=True)
def comment_list(context):
    form = CommentForm(initial={'entity_id' : context['entity_id'], 
                                'content_type_id' : context['content_type_id'],
                                'current_user_id' : context['current_user_id'],
                                'type': context['type'],
                                })
    return {
        'entity_id' : context['entity_id'], 
        'content_type_id' : context['content_type_id'],
        'current_user_id' : context['current_user_id'],
        'type': context['type'],
        'comments': context['comments'],
        'comment_count': Comment.objects.get_comment_count_by_id(context['entity_id'], context['content_type_id']),
        'form': form,
    }
    
    
@register.inclusion_tag('comments/comment_details.html', takes_context=True)
def comment_details(context, c, show_reply):
    form = CommentForm(initial={'entity_id' : context['entity_id'], 
                                'content_type_id' : context['content_type_id'],
                                'current_user_id' : context['current_user_id'],
                                'type': context['type'],
                                'reply_to_id': c.id,
                                })
    
    return {
        'entity_id' : context['entity_id'], 
        'content_type_id' : context['content_type_id'],
        'current_user_id' : context['current_user_id'],
        'type': context['type'],
        'c': c,
        'child_comments' : c.children.all(),
        'details_form': form,
        'show_reply' : show_reply,
    }