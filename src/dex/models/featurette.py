from django.db import models

class Featurette(models.Model):
    rank = models.IntegerField()
    
    class Meta:
        app_label = 'dex'
        
    def __unicode__(self):
        return self.rank
    
    def __str__(self):
        return "id:" + str(self.id) + " rank:" + self.rank    