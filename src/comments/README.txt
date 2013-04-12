To include in your project...

1.  In the urls.py of the project, add this line
	 url(r'^comments/', include('comments.urls', namespace="comments")),
	 
2.  In the model, register the models that should have comments applied (This will add dynamic methods to the model... look at the __init__ of the comments package for more info)
	Ex:  comments.register(Example)
	
3.  In your template, load the comment includes
	{% load comment_includes %}
	
4.  In your template where you want the comments to be displayed, include the comments tag passing in the entity object
    Ex:  {% comments exampleInstance %} 