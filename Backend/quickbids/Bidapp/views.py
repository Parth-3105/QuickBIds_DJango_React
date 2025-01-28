from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Products,UserProducts
from .serializers import UserSerializer,BidProductsSerializer,UserProductSerializer
from rest_framework.exceptions import NotFound

# Signup View
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Login View
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            Currentuser=User.objects.get(username=username)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'username':str(username),
                'email':str(Currentuser.email)
            }, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    
class ProductListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, product_id=None, category_name=None,search=None, *args, **kwargs):
        if product_id:
            # Fetch a single product by ID
            try:
                product = Products.objects.get(ItemID=product_id)
            except Products.DoesNotExist:
                raise NotFound(detail="Product not found", code=status.HTTP_404_NOT_FOUND)
            
            serializer = BidProductsSerializer(product)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        elif category_name:
            # Fetch products by categoryName    
            print(category_name)
            products = Products.objects.filter(MainCategoryName__icontains=category_name)

            if not products.exists():
                raise NotFound(detail="No products found in this category", code=status.HTTP_404_NOT_FOUND)
            
        else:
            # Fetch all products
            products = Products.objects.all()

        if search:
            products = products.filter(Products(ProductTitle__icontains=search))
        serializer = BidProductsSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

        
    def patch(self, request, product_id=None, *args, **kwargs):
        if product_id:
            # Update a product by ID
            try:
                product = Products.objects.get(ItemID=product_id)
            except Products.DoesNotExist:
                raise NotFound(detail="Product not found", code=status.HTTP_404_NOT_FOUND)
            
            serializer = BidProductsSerializer(product, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"detail": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)

class InsertUserProductView(APIView):
    permission_classes=[AllowAny]
    def post(self, request):
        serializer = UserProductSerializer(data=request.data)

        # Validate the request data
        if serializer.is_valid():
            serializer.save()  # Save to the database
            return Response({"message": "Product inserted successfully"}, status=status.HTTP_201_CREATED)
        
        # If validation fails, return errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        products = UserProducts.objects.all() # Fetch all user products
        serializer = UserProductSerializer(products, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)