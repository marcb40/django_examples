'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from django.conf.urls import patterns, url
from django.views.generic.list import ListView

urlpatterns = patterns('',
    url(r'^browse/examples/$',
        ListView.as_view(
            queryset=Example.objects.all()[:5],
            context_object_name='examples',
            template_name='dex/example/browse.html'),
        name='browse'),
                       
    url(r'^show/example/(?P<example_id>\d+)$', 'dex.views.example.show', name='show'),      
    url(r'^edit/example/(?P<example_id>\d+)$', 'dex.views.example.edit', name='edit'),    
    url(r'^update/example/(?P<example_id>\d+)$', 'dex.views.example.update', name='update'),                         
)