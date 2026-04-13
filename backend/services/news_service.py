import os
import requests

# Requer NEWS_API_KEY (token GNews) definida no ambiente.
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

# Domínios priorizados. Deixe vazio para aceitar qualquer um.
ALLOWED_DOMAINS = (
    "valor.globo.com",
    "g1.globo.com",
    "ge.globo.com",
    "revistagloborural.globo.com",
    "economia.uol.com.br",
    "oglobo.globo.com",
    "reuters.com",
    "estadao.com.br",
    "folha.uol.com.br",
)


def _allowed(url: str) -> bool:
    if not url:
        return False
    if not ALLOWED_DOMAINS:
        return True
    return any(domain in url for domain in ALLOWED_DOMAINS)


def get_agro_news():
    """
    Busca notícias em tempo real via GNews.
    Retorna lista vazia se não houver chave ou se a API falhar.
    """
    if not NEWS_API_KEY:
        return []

    url = "https://gnews.io/api/v4/search"
    params = {
        "q": "agronegócio OR agro OR soja OR milho OR trigo OR farelo OR fertilizante OR 3tentos OR caramuru",
        "lang": "pt",
        "max": 12,
        "token": NEWS_API_KEY,
        "sortby": "publishedAt",
    }

    try:
        response = requests.get(url, params=params, timeout=8)
    except requests.RequestException:
        return []

    if response.status_code != 200:
        return []

    data = response.json()

    seen = set()
    articles = []
    for a in data.get("articles", []):
        title = a.get("title")
        url_item = a.get("url")
        if not title or not url_item:
            continue
        if not _allowed(url_item):
            continue
        if url_item in seen:
            continue
        seen.add(url_item)

        articles.append(
            {
                "title": title,
                "url": url_item,
                "source": a.get("source"),
                "publishedAt": a.get("publishedAt"),
                "image": a.get("image"),
                "description": a.get("description"),
            }
        )

    return articles
