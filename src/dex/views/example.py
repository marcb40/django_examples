'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.forms.example import ExampleForm
from dex.models.example import Example
from django.shortcuts import get_object_or_404, render, redirect, \
    render_to_response
from django.template.context import RequestContext

def show(request, example_id):
    example_instance = get_object_or_404(Example, pk=example_id)
    return render(request, 'dex/example/show.html', {'example_instance': example_instance})

def edit(request, example_id):
    example_instance = get_object_or_404(Example, pk=example_id)
    form = ExampleForm(instance=example_instance)
    return render(request, 'dex/example/edit.html', {'example_instance_id': example_instance.id, 'form' : form})

def update(request, example_id):
    example_instance = get_object_or_404(Example, pk=example_id)
    
    form = ExampleForm(request.POST, instance=example_instance)
    if (form.is_valid()):
        example_instance = form.save()
        return redirect('dex:show', example_instance.id,)
    else :
        return render_to_response("dex/example/edit.html", {'example_instance_id': example_id, "form": form,}, context_instance=RequestContext(request))
