from django import template
from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType

register = template.Library()

@register.inclusion_tag('comments/comments.html', takes_context=True)
def comments(context):
    ctype = ContentType.objects.get_for_model(context['exampleInstance'])
    
    return {
        'entity_id': context['exampleInstance'].id,
        'content_type_id' : ctype.pk,
        'current_user_id' : User.objects.all()[0].id,
        'type': 'exampleOverview',
        'comments': context['exampleInstance'].get_comments(),
        'comment_count': len(context['exampleInstance'].get_comments()),
    }

def following(context):
    return 