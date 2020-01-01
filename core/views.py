from datetime import date
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import connection
from django.shortcuts import render
from django.db.models import Sum, Q
from .models import Price, Ticker

@api_view(['POST'])
def calculate(request):
    assets = {}
    for ticker, quantity in request.data:
        if ticker not in assets:
            assets[ticker] = 0
        assets[ticker] += int(quantity)

    result = []
    today = date.today()
    for year in range(today.year - 10, today.year + 1):
        queryset = Price.objects.filter(date__year=year, ticker__in=assets.keys())
        compiler = connection.ops.compiler(queryset.query.compiler)(queryset.query, connection, None)
        queryset_where_tuple = queryset.query.where.as_sql(compiler, connection)
        where = queryset_where_tuple[0]
        where_params = queryset_where_tuple[1]

        sql = """
            WITH last_prices AS (
                SELECT max(date) AS date, ticker_id
                  FROM core_price
                 WHERE {where}
                 GROUP BY ticker_id
            )

               SELECT core_price.ticker_id,
                      core_price.value,
                      sum(core_dividend.value)
                 FROM core_price
                 JOIN last_prices ON core_price.date = last_prices.date
            LEFT JOIN core_dividend ON last_prices.ticker_id = core_dividend.ticker_id
                WHERE core_price.ticker_id = last_prices.ticker_id
                  AND year(core_dividend.declared_at) = year(last_prices.date)
             GROUP BY core_price.ticker_id
        """.format(where=where)

        with connection.cursor() as cursor:
            cursor.execute(sql, where_params)
            rows = cursor.fetchall()

        dividend_paid = 0
        portfolio_cost = 0
        for ticker, price, dividends in rows:
            dividend_paid += dividends * assets[ticker]
            portfolio_cost += price * assets[ticker]

        result.append({
            'year': year,
            'dividend_paid': dividend_paid,
            'portfolio_cost': portfolio_cost,
            'dividend_yield': dividend_paid / portfolio_cost if portfolio_cost > 0 else 0,
        })

    return Response(result)

@api_view(['GET'])
def search(request):
    q = request.query_params['q'] if 'q' in request.query_params else ''
    if q == '':
        return Response([])

    conditions = Q(code__icontains=q) | Q(company__name__icontains=q)
    tickers = Ticker.objects.filter(conditions).order_by('code').all()[:20]

    results = []
    for ticker in tickers:
        results.append({'ticker': ticker.code, 'name': ticker.company.name})

    return Response(results)
