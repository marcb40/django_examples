class AlreadyRegistered(Exception):
    """
    An attempt was made to register a model more than once.
    """
    pass


registry = []


def register(model, comments_descriptor_attr='comments'):
    """
    Sets the given model class up for working with comments.
    """

    from comments.managers import CommentDescriptor

    if model in registry:
        raise AlreadyRegistered("The model '%s' has already been "
            "registered." % model._meta.object_name)
    if hasattr(model, comments_descriptor_attr):
        raise AttributeError("'%s' already has an attribute '%s'. You must "
            "provide a custom comments_descriptor_attr to register." % (
                model._meta.object_name,
                comments_descriptor_attr,
            )
        )


    # Add comment descriptor
    setattr(model, comments_descriptor_attr, CommentDescriptor())

    # Finally register in registry
    registry.append(model)