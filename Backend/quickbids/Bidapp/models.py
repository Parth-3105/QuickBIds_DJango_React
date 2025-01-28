from django.db import models

# Create your models here.
class Products(models.Model):
    ItemID = models.CharField(max_length=100, unique=True)
    ProductTitle = models.CharField(max_length=255)
    ProductDescription = models.TextField()
    ProductPrice=models.DecimalField(max_digits=10, decimal_places=2)
    MainImageURL = models.URLField()
    AllImagesURLs = models.JSONField()
    CategoryID=models.IntegerField()
    CategoryName = models.CharField(max_length=100)
    MainCategoryName = models.CharField(max_length=100,default=None)
    ItemSpecifications = models.JSONField()
    EndTime = models.DateTimeField()
    current_BID=models.DecimalField(
        max_digits=10, decimal_places=2, default=0)
    BidHistory=models.JSONField(default=None)
    current_BIDDER = models.CharField(max_length=255, null=True, blank=True)

class UserProducts(models.Model):
    username=models.CharField(max_length=100)
    ProductId=models.CharField(max_length=100,unique=True)

