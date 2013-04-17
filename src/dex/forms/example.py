'''
Created on Apr 15, 2013

@author: mbianchini
'''
from dex.models.example import Example
from django import forms

class ExampleForm(forms.ModelForm):
    class Meta:
        model = Example