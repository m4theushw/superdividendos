import csv
from django.core.management.base import BaseCommand, CommandError
from core.models import Company

class Command(BaseCommand):
    help = 'Imports the companies dataset'

    def add_arguments(self, parser):
        parser.add_argument('dataset', help='Path to the .csv dataset')

    def handle(self, *args, **options):
        print('Deleting all existing records')
        Company.objects.all().delete()

        path = options['dataset']
        keys = [f.name for f in Company._meta.fields]

        with open(path, mode='r', encoding='utf-8') as file_handler:
            for row in csv.DictReader(file_handler):
                filtered = {k: v for k, v in row.items() if k in keys}
                obj = Company(**filtered)
                obj.save()

                for ticker in self.extract_tickers(row):
                    obj.tickers.create(code=ticker)

        print('{:,} objects created'.format(Company.objects.count()))

    def extract_tickers(self, row):
        for num in range(0, 10):
            ticker = row.get('ticker_{}'.format(num))
            if ticker:
                yield ticker
