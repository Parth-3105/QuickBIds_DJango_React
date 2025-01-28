from django.contrib import admin
# Register your models here.
from .models import Products,UserProducts
admin.site.register(Products)
admin.site.register(UserProducts)