from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services.market_data import get_ticker_data
from services.quarterly import (
    get_quarterly_data,
    get_semiannual_data,
    get_tres_tentos_data,
    get_tres_tentos_summary,
)
from routes.agro_news import router as agro_news_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "DCM Agro API Running"}


@app.get("/api/market/ticker")
def ticker():
    return get_ticker_data()


@app.get("/api/market/quarterly")
def quarterly(asset: str):
    return get_quarterly_data(asset)


@app.get("/api/market/semiannual")
def semiannual(asset: str):
    return get_semiannual_data(asset)


@app.get("/api/3tentos/history")
def tres_tentos_history():
    return get_tres_tentos_data()


@app.get("/api/3tentos/summary")
def tres_tentos_summary():
    return get_tres_tentos_summary()


@app.get("/3tentos")
def get_tres_tentos():
    return get_tres_tentos_data()


app.include_router(agro_news_router)
