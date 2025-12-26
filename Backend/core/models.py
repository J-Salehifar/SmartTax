from django.db import models
from django.conf import settings

class Taxpayer(models.Model):
    name = models.CharField(max_length=100)
    national_id = models.CharField(max_length=10, unique=True)
    phone = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.name


class Case(models.Model):
    STATUS_CHOICES = [
        ('success', 'موفق'),
        ('rejected','رد شده'),
        ('review','در حال بررسی'),
    ]

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='cases'
    )
    taxpayer = models.ForeignKey(Taxpayer, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    income = models.BigIntegerField()
    tax_amount = models.BigIntegerField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
