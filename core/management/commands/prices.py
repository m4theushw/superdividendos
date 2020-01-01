import re
from os.path import basename
from django.core.management.base import BaseCommand, CommandError
from core.models import Ticker, Price
from datetime import datetime

class Command(BaseCommand):
    help = 'Imports a prices file'

    def add_arguments(self, parser):
        parser.add_argument('dataset', help='Path to the .txt file')

    def handle(self, *args, **options):
        path = options['dataset']
        match = re.match(r'COTAHIST_A(\d{4}).TXT', basename(path.upper()))
        if match is None:
            raise CommandError('The file is named incorrectly.')

        year = match.group(1)
        print('Deleting prices from {}'.format(year))
        Price.objects.filter(date__year=year).delete()
        tickers = {str(ticker.code): ticker for ticker in Ticker.objects.all()}

        objs = []
        with open(path, mode='r', encoding='utf-8') as file_handler:
            for row in file_handler:
                if row[0:2] != '01':
                    continue

                ticker = row[12:24].strip()
                if ticker not in tickers:
                    continue

                date = datetime.strptime(row[2:10], '%Y%m%d')
                value = self.to_float(row[108:121])
                obj = Price(date=date, value=value, ticker=tickers[ticker])
                objs.append(obj)

        Price.objects.bulk_create(objs, batch_size=1000)
        print('{:,} objects created'.format(Price.objects.filter(date__year=year).count()))

    def to_float(self, value):
        return float('{}.{}'.format(value[:-2], value[-2:len(value)]))

