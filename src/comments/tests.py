'''
Created on Apr 10, 2013

@author: mbianchini
'''
from django.contrib.auth.models import User
from django.test import TestCase
import comments

class CommentTests(TestCase):


    def test_comment(self):
        """
        Registers the User object with the comments package so comments can be added to and retrieved from a user
        """
        
        comments.register(User)
        user = User.objects.create(username="myuser")
        user.comments = "test comment one"
        user.comments = "test comment two"
        
        mAfterSave = User.objects.get(pk=user.id)
        self.assertEqual('myuser', mAfterSave.username)
        self.assertEqual(2, len(mAfterSave.comments))
        self.assertEqual("test comment one", mAfterSave.comments[0].comment)
        self.assertEqual("test comment two", mAfterSave.comments[1].comment)
