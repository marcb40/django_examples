'''
Created on Apr 10, 2013

@author: mbianchini
'''
from comments.models import Comment
from django.contrib.auth.models import User
from django.test import TestCase
import comments

class CommentTests(TestCase):


    def test_comment(self):
        """
        Registers the User object with the comments package so comments can be added to and retrieved from a user
        """
        commenter = User.objects.create(username="commenter")
        
        comments.register(User)
        user = User.objects.create(username="myuser")
        user.add_comment(Comment(comment="test comment one", creator=commenter))
        user.add_comment(Comment(comment="test comment two", creator=commenter, parent=user.get_comments()[0]))
        
        mAfterSave = User.objects.get(pk=user.id)
        self.assertEqual('myuser', mAfterSave.username)
        self.assertEqual(2, len(mAfterSave.get_comments()))
        
        self.assertEqual("test comment one", mAfterSave.get_comments()[0].comment)
        self.assertEqual(commenter, mAfterSave.get_comments()[0].creator)
        self.assertEqual(None, mAfterSave.get_comments()[0].parent)
        
        self.assertEqual("test comment two", mAfterSave.get_comments()[1].comment)
        self.assertEqual(commenter, mAfterSave.get_comments()[1].creator)
        self.assertEqual("test comment one", mAfterSave.get_comments()[1].parent.comment)
