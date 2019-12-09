from django.db import models

class Company(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        verbose_name_plural = 'Companies'

    def __str__(self):
        return self.name

class Ticker(models.Model):
    code = models.CharField(max_length=6, primary_key=True)
    company = models.ForeignKey(Company, related_name='tickers', on_delete=models.CASCADE)

    def __str__(self):
        return self.code

class Dividend(models.Model):
    declared_at = models.DateField()
    ticker = models.ForeignKey(Ticker, related_name='dividends', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=14, decimal_places=10)
    type = models.CharField(max_length=10)

class Price(models.Model):
    date = models.DateField()
    ticker = models.ForeignKey(Ticker, related_name='prices', on_delete=models.CASCADE)
    value = models.DecimalField(max_digits=14, decimal_places=2)
