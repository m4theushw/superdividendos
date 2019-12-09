import re
import os
import requests
import pandas as pd
from datetime import datetime, date
from bs4 import BeautifulSoup
from tenacity import *

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_PATH = os.path.join(BASE_DIR, 'data')
DATE = date.today().strftime('%Y-%m-%d')
OUTPUT_PATH = os.path.join(DATA_PATH, '{}-companies.csv'.format(DATE))

LIST_URL = 'http://bvmf.bmfbovespa.com.br/cias-listadas/empresas-listadas/BuscaEmpresaListada.aspx'
INFO_URL = 'http://bvmf.bmfbovespa.com.br/pt-br/mercados/acoes/empresas/ExecutaAcaoConsultaInfoEmp.asp?CodCVM={}'

@retry(wait=wait_exponential(), stop=stop_after_attempt(10))
def fetch_tickers(company):
    print('Fetching tickers of {}'.format(company['name']))
    request = requests.get(INFO_URL.format(company['id']))
    soup = BeautifulSoup(request.text, features='html.parser')
    info = soup.find('table', class_='ficha responsive')
    if 'Nenhum ativo no Mercado a Vista' in info.text:
        return pd.Series()
    tickers = list(set([t.string for t in info.find_all('a', class_='LinkCodNeg')]))
    return pd.Series(tickers).rename(lambda idx: 'ticker_%i' % idx)

def fetch_companies():
    params = {'idioma': 'pt-br'}
    payload = {'__EVENTTARGET': 'ctl00:contentPlaceHolderConteudo:BuscaNomeEmpresa1:btnTodas'}
    request = requests.post(LIST_URL, params=params, data=payload)
    soup = BeautifulSoup(request.text, features='html.parser')
    table = soup.find('table', id='ctl00_contentPlaceHolderConteudo_BuscaNomeEmpresa1_grdEmpresa_ctl01')
    companies = []
    for row in table.find_all('tr')[1:]:
        link = row.find('a')
        name = link.string
        code = re.search(r'(\d+)', link['href']).group(0)
        companies.append([code, name])
    return companies

if __name__ == '__main__':
    companies = pd.DataFrame(fetch_companies(), columns=['id', 'name'])
    print('{} companies found.'.format(len(companies)))

    df = pd.concat([companies, companies.apply(fetch_tickers, axis=1)], axis=1)
    df = df[~df['ticker_0'].isna()]
    df.to_csv(OUTPUT_PATH, index=False)
    print('Done.')
