from django.contrib import admin
from .models import User, Repository, Job, Result, Analysis



# Register your models here.

admin.site.register(User)
admin.site.register(Repository)
admin.site.register(Job)
admin.site.register(Result)
admin.site.register(Analysis)
