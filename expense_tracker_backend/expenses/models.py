from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Expense(models.Model):
    CATEGORY_CHOICES = [
        ('Food', 'Food'),
        ('Transport', 'Transport'),
        ('Entertainment', 'Entertainment'),
        ('Utilities', 'Utilities'),
        ('Healthcare', 'Healthcare'),
        ('Other', 'Other'),
    ]

    date = models.DateField()
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def clean(self):
        if self.amount <= 0:
            raise ValidationError('Amount must be greater than 0.')

    def __str__(self):
        return f"{self.category} - {self.amount}"