'''
Created on Apr 8, 2013

@author: mbianchini
'''
from core_examples.models.example import Example
from core_examples.models.exampleGroup import ExampleGroup
from core_examples.models.group import OrganizationGroup
from core_examples.models.profile import Profile
from core_examples.models.user import User
from django.contrib import admin


admin.site.register(Example)
admin.site.register(OrganizationGroup)
admin.site.register(Profile)
admin.site.register(User)
admin.site.register(ExampleGroup)
