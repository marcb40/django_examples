'''
Created on Apr 15, 2013

@author: mbianchini
'''
from dex.models.example import Example
from django.db import models

class Phase(models.Model):
    example = models.ForeignKey(Example)

class PhaseAnswer(models.Model):
    phase = models.ForeignKey(Phase)