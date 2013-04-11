'''
Created on Apr 8, 2013

@author: mbianchini
'''
from dex.models.example import Example
from dex.models.exampleGroup import ExampleGroup
from dex.models.group import OrganizationGroup
from dex.models.profile import Profile
from dex.models.userExample import UserExample
from dex.models.userGroup import UserGroup
from django.contrib import admin


admin.site.register(Example)
admin.site.register(OrganizationGroup)
admin.site.register(Profile)
admin.site.register(ExampleGroup)
admin.site.register(UserExample)
admin.site.register(UserGroup)
