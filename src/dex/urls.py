'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from django.conf.urls import patterns, url
from django.views.generic.detail import DetailView
from django.views.generic.list import ListView

urlpatterns = patterns('',
    url(r'^browse/examples/$',
        ListView.as_view(
            queryset=Example.objects.all()[:5],
            context_object_name='examples',
            template_name='dex/example/browse.html'),
        name='browse'),
                       
    url(r'^show/example/(?P<pk>\d+)$',
        DetailView.as_view(
            model=Example,
            template_name='dex/example/show.html'),
        name='show'),
)