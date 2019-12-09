import os
import requests
import pandas as pd
from datetime import datetime, date
from bs4 import BeautifulSoup

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, 'data')
DATE = date.today().strftime('%Y-%m-%d')
OUTPUT_PATH = os.path.join(DATA_PATH, '{}-dividends.csv'.format(DATE))
COMPANIES_PATH = os.path.join(DATA_PATH, '{}-companies.csv'.format(DATE))
DIVIDENDS_URL = 'http://bvmf.bmfbovespa.com.br/cias-listadas/empresas-listadas/ResumoProventosDinheiro.aspx?codigoCvm={}'

def build_tickers_map(row):
    tickers_map = {}
    for i in range(0, 10):
        ticker = row.get('ticker_{}'.format(i))
        if ticker:
            stock_class = ticker[4:6]
            if stock_class == '3':
                tickers_map['ON'] = ticker
            elif stock_class == '4':
                tickers_map['PN'] = ticker
            elif stock_class == '5':
                tickers_map['PNA'] = ticker
            elif stock_class == '6':
                tickers_map['PNB'] = ticker
            elif stock_class == '7':
                tickers_map['PNC'] = ticker
            elif stock_class == '8':
                tickers_map['PND'] = ticker
            elif stock_class == '11':
                tickers_map['UNT'] = ticker
    return tickers_map

def fetch_dividends(id, row, tickers):
    print('Fetching dividends of {} - {}'.format(id, row['name']))
    response = requests.get(DIVIDENDS_URL.format(id))
    soup = BeautifulSoup(response.text, features='html.parser')
    table = soup.find('table', id='ctl00_contentPlaceHolderConteudo_grdProventos_ctl01')
    if table is None:
        return pd.DataFrame()

    rows = table.find_all('tr')[1:]
    dividends = []
    for row in rows:
        columns = row.find_all('td')
        stock_class = columns[0].string
        if stock_class not in tickers or columns[1].string == 'ESTATUTÁRIO':
            continue
        ticker = tickers[stock_class]
        declared_at = datetime.strptime(columns[1].string, '%d/%m/%Y').strftime('%Y-%m-%d')
        divisor = int(columns[3].string)
        value = float(columns[2].string.replace(',', '.')) / divisor
        type = 'JCP' if columns[4].string == 'JRS CAP PROPRIO' else 'Dividendos'
        dividends.append([ticker, declared_at, value, type])

    columns = ['ticker', 'declared_at', 'value', 'type']
    return pd.DataFrame(dividends, columns=columns)

if __name__ == '__main__':
    if not os.path.exists(COMPANIES_PATH):
        raise TypeError('Could not find the companies dataset.')

    companies = pd.read_csv(COMPANIES_PATH, index_col=['id'], keep_default_na=False)
    print('{} companies found.'.format(len(companies)))

    df = pd.DataFrame()
    for id, row in companies.iterrows():
        tickers = build_tickers_map(row)
        dividends = fetch_dividends(id, row, tickers)
        df = pd.concat([df, dividends])

    df.to_csv(OUTPUT_PATH, index=False)
    print('Done.')
