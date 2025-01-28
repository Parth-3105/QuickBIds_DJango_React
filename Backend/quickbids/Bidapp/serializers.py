from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Products,UserProducts

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
from rest_framework import serializers

class BidProductsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Products  # Replace with the name of your model
        fields = [
            'ItemID',
            'ProductTitle',
            'ProductDescription',
            'ProductPrice',
            'MainImageURL',
            'AllImagesURLs',
            'CategoryID',
            'CategoryName',
            'MainCategoryName',
            'ItemSpecifications',
            'EndTime',
            'current_BID',
            'current_BIDDER',
            'BidHistory'
        ]
        
        def update(self, instance, validated_data):
            if 'current_BID' in validated_data:
                instance.current_BID = validated_data['current_BID']
            if 'BidHistory' in validated_data:
                instance.BidHistory = validated_data['BidHistory']
            instance.save()
            return instance
        
class UserProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProducts
        fields = ['username', 'ProductId']
