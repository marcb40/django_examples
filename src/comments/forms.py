'''
Created on Apr 11, 2013

@author: mbianchini
'''
from django import forms

class CommentForm(forms.Form):
    comment = forms.CharField(widget=forms.Textarea, max_length=300, required=True)
    entity_id = forms.IntegerField(widget=forms.HiddenInput)
    content_type_id = forms.IntegerField(widget=forms.HiddenInput)
    current_user_id = forms.IntegerField(widget=forms.HiddenInput)
    type = forms.CharField(widget=forms.HiddenInput)
    reply_to_id = forms.IntegerField(widget=forms.HiddenInput, required=False)
