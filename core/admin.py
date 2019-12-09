from django.contrib import admin
from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html
from core.models import Company, Ticker, Dividend

class TickerInline(admin.TabularInline):
    model = Ticker

class CompanyAdmin(admin.ModelAdmin):
    inlines = (TickerInline,)
    search_fields = ('name',)
    list_display = ('name', 'tickers')

    def tickers(self, obj):
        links = [self.link_for_dividend_page(t) for t in obj.tickers.all()]
        return format_html(', '.join(links))

    def link_for_dividend_page(self, ticker):
        params = {'ticker': ticker.code}
        url = reverse('admin:core_dividend_changelist')
        return '<a href="{}?{}">{}</a>'.format(url, urlencode(params), ticker.code)

class InputFilter(admin.SimpleListFilter):
    template = 'admin/input_filter.html'

    def lookups(self, request, model_admin):
        return ((),)

    def choices(self, changelist):
        print(changelist)
        # Grab only the "all" option.
        all_choice = next(super().choices(changelist))
        all_choice['query_parts'] = (
            (k, v)
            for k, v in changelist.get_filters_params().items()
            if k != self.parameter_name
        )
        yield all_choice

class TickerFilter(InputFilter):
    parameter_name = 'ticker'
    title = 'Ticker'

    def queryset(self, request, queryset):
        if self.value() is not None:
            return queryset.filter(ticker__code=self.value())

class DividendAdmin(admin.ModelAdmin):
    list_display = ('ticker_code', 'declared_at', 'value', 'type')
    list_filter = (TickerFilter,)

    def ticker_code(self, obj):
        return obj.ticker.code
    ticker_code.short_description = 'Ticker'

admin.site.register(Company, CompanyAdmin)
admin.site.register(Dividend, DividendAdmin)
