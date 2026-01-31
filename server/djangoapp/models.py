from django.db import models
from django.utils.timezone import now
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.

class CarMake(models.Model):
    """Model representing a car manufacturer/make."""
    name = models.CharField(max_length=100)
    description = models.TextField()
    country = models.CharField(max_length=100, blank=True, null=True)
    founded_year = models.IntegerField(blank=True, null=True)

    def __str__(self):
        return self.name  # Return the name as the string representation


class CarModel(models.Model):
    """Model representing a car model."""
    car_make = models.ForeignKey(CarMake, on_delete=models.CASCADE)  # Many-to-One relationship
    dealer_id = models.IntegerField()  # Refers to a dealer in Cloudant database
    name = models.CharField(max_length=100)
    
    CAR_TYPES = [
        ('SEDAN', 'Sedan'),
        ('SUV', 'SUV'),
        ('WAGON', 'Wagon'),
        ('COUPE', 'Coupe'),
        ('CONVERTIBLE', 'Convertible'),
        ('HATCHBACK', 'Hatchback'),
        ('TRUCK', 'Truck'),
    ]
    type = models.CharField(max_length=15, choices=CAR_TYPES, default='SUV')
    year = models.IntegerField(
        default=2023,
        validators=[
            MaxValueValidator(2023),
            MinValueValidator(2015)
        ]
    )

    def __str__(self):
        return f"{self.car_make.name} {self.name}"  # Return the make and model name
