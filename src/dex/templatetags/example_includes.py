from django import template
register = template.Library()

@register.simple_tag
def is_visible(visible):
    if ( visible):
        return "checked"
    else:
        return ""
    
@register.simple_tag
def is_not_visible(visible):
    if ( visible):
        return ""
    else:
        return "checked"