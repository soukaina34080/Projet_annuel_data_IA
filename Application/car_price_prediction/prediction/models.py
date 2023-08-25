from django.db import models

class TrainData(models.Model):
    brand = models.CharField(max_length=100)
    kilometers = models.IntegerField()
    year = models.IntegerField()
    gear_box = models.CharField(max_length=50)
    energy = models.CharField(max_length=50)
    price = models.FloatField()

    def __str__(self):
        return f"{self.brand} - {self.year}"

class TestData(models.Model):
    brand = models.CharField(max_length=100)
    kilometers = models.IntegerField()
    year = models.IntegerField()
    gear_box = models.CharField(max_length=50)
    energy = models.CharField(max_length=50)

    def __str__(self):
        return f"{self.brand} - {self.year}"

