import yfinance as yf

def get_price(symbol):
    ticker = yf.Ticker(symbol)
    data = ticker.history(period="1d", interval="5m")

    if data.empty or len(data) < 2:
        return {"price": None, "change": None}

    latest = data.iloc[-1]
    previous = data.iloc[-2]

    price = round(latest["Close"], 2)
    change = round(((latest["Close"] - previous["Close"]) / previous["Close"]) * 100, 2)

    return {
        "price": price,
        "change": change
    }

def get_ticker_data():
    return {
        "soja": get_price("ZS=F"),
        "milho": get_price("ZC=F"),
        "trigo": get_price("KE=F"),    
        "tres_tentos": get_price("TTEN3.SA")
    }