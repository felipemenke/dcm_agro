import json
from pathlib import Path

import yfinance as yf

BASE_DIR = Path(__file__).resolve().parent.parent
DATA_FILE = BASE_DIR / "data" / "tres_tentos.json"


def get_quarterly_data(symbol):
    ticker = yf.Ticker(symbol)
    hist = ticker.history(start="2020-01-01", end="2025-12-31", interval="1mo")

    if hist.empty:
        return []

    hist["Quarter"] = hist.index.to_period("Q")
    quarterly = hist.groupby("Quarter")["Close"].mean().reset_index()

    result = []
    for _, row in quarterly.iterrows():
        result.append({
            "quarter": str(row["Quarter"]),
            "price": round(float(row["Close"]), 2)
        })

    return result


def get_semiannual_data(symbol):
    ticker = yf.Ticker(symbol)
    hist = ticker.history(start="2020-01-01", end="2025-12-31", interval="1mo")

    if hist.empty:
        return []

    hist["Semester"] = hist.index.to_period("2Q")
    semi = hist.groupby("Semester")["Close"].mean().reset_index()

    result = []
    for _, row in semi.iterrows():
        result.append({
            "semester": str(row["Semester"]),
            "price": round(float(row["Close"]), 2)
        })

    return result


def get_tres_tentos_data():
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    return data


def get_tres_tentos_summary():
    data = get_tres_tentos_data()

    if not data:
        return {
            "latest_quarter": None,
            "latest_revenue": None,
            "latest_ebitda": None,
            "latest_net_debt": None,
            "revenue_growth_qoq_pct": None,
            "ebitda_margin_pct": None,
            "net_debt_change_qoq_pct": None,
        }

    latest = data[-1]
    prev = data[-2] if len(data) > 1 else latest

    revenue_growth_qoq = None
    net_debt_change_qoq = None

    if prev["revenue"]:
        revenue_growth_qoq = ((latest["revenue"] - prev["revenue"]) / prev["revenue"]) * 100

    if prev["net_debt"]:
        net_debt_change_qoq = ((latest["net_debt"] - prev["net_debt"]) / prev["net_debt"]) * 100

    ebitda_margin = None
    if latest["revenue"]:
        ebitda_margin = (latest["ebitda"] / latest["revenue"]) * 100

    return {
        "latest_quarter": latest["quarter"],
        "latest_revenue": round(float(latest["revenue"]), 3),
        "latest_ebitda": round(float(latest["ebitda"]), 3),
        "latest_net_debt": round(float(latest["net_debt"]), 3),
        "revenue_growth_qoq_pct": round(revenue_growth_qoq, 2) if revenue_growth_qoq is not None else None,
        "ebitda_margin_pct": round(ebitda_margin, 2) if ebitda_margin is not None else None,
        "net_debt_change_qoq_pct": round(net_debt_change_qoq, 2) if net_debt_change_qoq is not None else None,
    }