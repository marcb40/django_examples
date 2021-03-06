from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
     url(r'^dex/', include('dex.urls', namespace="dex")),
     url(r'^comments/', include('comments.urls', namespace="comments")),
    # Examples:
    # url(r'^$', 'django_examples.views.home', name='home'),
    # url(r'^django_examples/', include('django_examples.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
     url(r'^admin/', include(admin.site.urls)),
)
