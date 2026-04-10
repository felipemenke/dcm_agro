from fastapi import APIRouter
from services.news_service import get_agro_news

router = APIRouter(prefix="/api")


@router.get("/agro-news")
def agro_news():
    return {"data": get_agro_news()}
