'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from dex.models.exampleGroup import ExampleGroup
from dex.models.group import OrganizationGroup
from dex.models.profile import Profile
from dex.models.user import User
from django.contrib import admin


admin.site.register(Example)
admin.site.register(OrganizationGroup)
admin.site.register(Profile)
admin.site.register(User)
admin.site.register(ExampleGroup)
