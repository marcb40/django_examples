'''
Created on Apr 15, 2013

@author: mbianchini
'''
from dex.models.example import Example
from django import forms
from django.contrib.auth.models import User
from django.forms.models import BaseModelFormSet
from django.forms.widgets import HiddenInput

class ExampleForm(forms.ModelForm):
    class Meta:
        model = Example
        exclude = ('user_affiliates', )
        
class BaseUserExampleFormSet(BaseModelFormSet): 
    def add_fields(self, form, index): 
        super(BaseUserExampleFormSet, self).add_fields(form,index) 
        form.fields["user"] = forms.ModelChoiceField(queryset=User.objects.all(), widget=HiddenInput)
        
