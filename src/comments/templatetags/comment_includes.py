from comments.forms import CommentForm
from django import template

register = template.Library()

@register.inclusion_tag('comments/comment_list.html', takes_context=True)
def comment_list(context):
    form = CommentForm(initial={'entity_id' : context['entity_id'], 
                                'content_type_id' : context['content_type_id'],
                                'current_user_id' : context['current_user_id'],
                                'type': context['type'],})
    return {
        'type': context['type'],
        'comments': context['comments'],
        'form': form,
    }
    
@register.inclusion_tag('comments/comment_details.html', takes_context=True)
def comment_details(context, c):
    return {
        'type': context['type'],
        'c': c,
    }