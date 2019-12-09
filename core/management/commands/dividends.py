import csv
from django.core.management.base import BaseCommand, CommandError
from core.models import Dividend, Ticker

class Command(BaseCommand):
    help = 'Imports the dividends dataset'

    def add_arguments(self, parser):
        parser.add_argument('dataset', help='Path to the .csv dataset')

    def handle(self, *args, **options):
        print('Deleting all existing records')
        Dividend.objects.all().delete()

        path = options['dataset']
        keys = [f.name for f in Dividend._meta.fields]
        tickers = {str(ticker.code): ticker for ticker in Ticker.objects.all()}

        objs = []
        with open(path, mode='r', encoding='utf-8') as file_handler:
            for row in csv.DictReader(file_handler):
                obj = Dividend()
                obj.type = row['type']
                obj.ticker = tickers[row['ticker']]
                obj.declared_at = row['declared_at']
                obj.value = float(row['value'].replace(',', '.'))
                objs.append(obj)

        Dividend.objects.bulk_create(objs)
        print('{:,} objects created'.format(Dividend.objects.count()))

    def extract_tickers(self, row):
        for num in range(0, 10):
            ticker = row.get('ticker_{}'.format(num))
            if ticker:
                yield ticker
