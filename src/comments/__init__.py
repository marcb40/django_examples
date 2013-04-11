from comments.models import Comment
class AlreadyRegistered(Exception):
    """
    An attempt was made to register a model more than once.
    """
    pass


registry = []


def add_comment(self, comment):
    Comment.objects.add_comment(self, comment)
    
def get_comments(self):
    return Comment.objects.get_for_object(self)

def register(model, comments_descriptor_attr='comments'):
    """
    Sets the given model class up for working with comments.
    """
    if model in registry:
        raise AlreadyRegistered("The model '%s' has already been "
            "registered." % model._meta.object_name)
    
    model.add_to_class("add_comment", add_comment) 
    model.add_to_class("get_comments", get_comments) 
    
    # Finally register in registry
    registry.append(model)