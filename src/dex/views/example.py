'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.forms.example import ExampleForm, BaseUserExampleFormSet
from dex.models.example import Example
from dex.models.userExample import UserExample
from django.contrib.auth.models import User
from django.forms.models import inlineformset_factory, modelformset_factory
from django.shortcuts import get_object_or_404, render, redirect, \
    render_to_response
from django.template.context import RequestContext

def show(request, example_id):
    example_instance = get_object_or_404(Example, pk=example_id)
    return render(request, 'dex/example/show.html', {'example_instance': example_instance})

def edit(request, example_id):
    example_instance = get_object_or_404(Example, pk=example_id)
    form = ExampleForm(instance=example_instance)
    UserExampleFormset = modelformset_factory(UserExample, formset=BaseUserExampleFormSet, extra=1, fields=("user",), can_delete=False)
    user_formset = UserExampleFormset(queryset=UserExample.objects.filter(example=example_instance))
    return render(request, 'dex/example/edit.html', {'example_instance_id': example_instance.id, 'form' : form, 'user_formset' : user_formset})

def update(request, example_id):
    example_instance = get_object_or_404(Example, pk=example_id)
    
    form = ExampleForm(request.POST, instance=example_instance)
    
    #UserExampleFormset = inlineformset_factory(Example, UserExample, formset=BaseUserExampleFormSet,  extra=2, fields=("user",), can_delete=False)
    UserExampleFormset = modelformset_factory(UserExample, formset=BaseUserExampleFormSet, extra=1, fields=("user",), can_delete=False)
    user_formset = UserExampleFormset(request.POST, queryset=UserExample.objects.filter(example=example_instance))
    if (form.is_valid()):
        example_instance = form.save()
        user_exs = user_formset.save(commit=False)
        for user_ex in user_exs :
            user_ex.example=example_instance
            user_ex.save()
        return redirect('dex:show', example_instance.id,)
    else :
        return render_to_response("dex/example/edit.html", {'example_instance_id': example_id, "form": form,}, context_instance=RequestContext(request))
