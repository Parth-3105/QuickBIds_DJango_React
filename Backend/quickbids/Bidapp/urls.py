from django.urls import path
from .views import *
urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('products/',ProductListView.as_view(),name='products'),
    path('products/<int:product_id>/', ProductListView.as_view(), name='product-detail'),
    path('products/category/<str:category_name>/', ProductListView.as_view(), name='product-by-category'),
    path('insertUserProduct/', InsertUserProductView.as_view(), name='insert_user_product'),
]