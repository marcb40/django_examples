'''
Created on Apr 8, 2013

@author: mbianchini
'''
from core_examples.models.example import Example
from django.conf.urls import patterns, url
from django.views.generic.list import ListView

urlpatterns = patterns('',
    url(r'^browse/examples/$',
        ListView.as_view(
            queryset=Example.objects.all()[:5],
            context_object_name='examples',
            template_name='core/browse.html'),
        name='browse'),
)