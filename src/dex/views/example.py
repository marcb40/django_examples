'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from django.shortcuts import get_object_or_404, render

def show(request, example_id):
    exampleInstance = get_object_or_404(Example, pk=example_id)
    return render(request, 'dex/example/show.html', {'exampleInstance': exampleInstance})