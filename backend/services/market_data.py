import yfinance as yf


def _fallback_price(ticker):
    """Use daily candles as plano B quando o intraday estiver vazio (mercado fechado)."""
    daily = ticker.history(period="1mo", interval="1d")
    if daily.empty:
        return None, None

    latest = daily.iloc[-1]
    previous = daily.iloc[-2] if len(daily) > 1 else daily.iloc[-1]
    price = round(latest["Close"], 2)
    change = round(((latest["Close"] - previous["Close"]) / previous["Close"]) * 100, 2) if previous["Close"] else None
    return price, change


def get_price(symbol: str):
    ticker = yf.Ticker(symbol)

    intraday = ticker.history(period="1d", interval="5m")
    price = change = None

    if not intraday.empty and len(intraday) >= 2:
        latest = intraday.iloc[-1]
        previous = intraday.iloc[-2]
        price = round(latest["Close"], 2)
        change = round(((latest["Close"] - previous["Close"]) / previous["Close"]) * 100, 2)
    else:
        price, change = _fallback_price(ticker)

    # fallback final: regularMarketPrice da API
    if price is None:
        info = ticker.fast_info if hasattr(ticker, "fast_info") else ticker.info
        raw_price = getattr(info, "last_price", None) if not isinstance(info, dict) else info.get("regularMarketPrice")
        if raw_price:
            price = round(float(raw_price), 2)
            change = None

    return {"price": price, "change": change}


def get_ticker_data():
    return {
        "soja": get_price("ZS=F"),
        "milho": get_price("ZC=F"),
        "trigo": get_price("KE=F"),
        "tres_tentos": get_price("TTEN3.SA"),
    }
