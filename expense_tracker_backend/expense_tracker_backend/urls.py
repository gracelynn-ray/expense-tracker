from django.urls import path
from expenses import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('api/expenses/', views.ExpenseListCreateView.as_view(), name='expense-list'),
    path('api/expenses/<int:pk>/', views.ExpenseDetailView.as_view(), name='expense-detail'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/register/', views.RegisterView.as_view(), name='register'),
]