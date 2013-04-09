from django import template

register = template.Library()

@register.inclusion_tag('comments/comments.html', takes_context=True)
def comments(context):
    return {
        'exampleInstance': context['exampleInstance'],
    }

def following(context):
    return 