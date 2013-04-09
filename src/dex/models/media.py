from django.db import models
from django.db.models.fields.related import ForeignKey
from dex.models.group import OrganizationGroup
from dex.models.example import Example


class Media(models.Model):
    rank = models.IntegerField()
    
    class Meta:
        app_label = 'dex'
        abstract = True
        
    def __str__(self):
        return "id:" + str(self.id) + " rank:" + str(self.rank)    

class GroupMedia(Media):
    group = ForeignKey(OrganizationGroup) 
    
    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return super().__str__() 

        
class GroupPhoto(GroupMedia):  
    title = models.CharField(max_length=60)
    photo_file = models.FileField(upload_to='group_photos')  #more appropriately ImageField, but this requires an image lib that isn't yet supported for python 3.3
    
    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return super().__str__() + " " + self.title  
   
        
class GroupVideo(GroupMedia):
    video_url = models.URLField()
    
    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return super().__str__() + " " + self.video_url    
    
    
class ExampleMedia(Media):
    example = ForeignKey(Example) 
    
    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return super().__str__() 

        
class ExamplePhoto(ExampleMedia):  
    title = models.CharField(max_length=60)
    photo_file = models.FileField(upload_to='example_photos')  #more appropriately ImageField, but this requires an image lib that isn't yet supported for python 3.3
    
    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return super().__str__() + " " + self.title  
   
        
class ExampleVideo(ExampleMedia):
    video_url = models.URLField()
    
    class Meta:
        app_label = 'dex'
        
    def __str__(self):
        return super().__str__() + " " + self.video_url        

