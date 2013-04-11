'''
Created on Apr 11, 2013

@author: mbianchini
'''
from django.conf.urls import patterns, url
urlpatterns = patterns('',
    url(r'^add/$', 'comments.views.add_comment', name='add_comment'),                       
)