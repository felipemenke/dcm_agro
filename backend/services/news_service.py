import os
import requests


NEWS_API_KEY = os.getenv("NEWS_API_KEY")

# Fallback vazio: melhor mostrar “sem notícias” do que links quebrados
SAMPLE_NEWS = []

# Domínios permitidos
ALLOWED_DOMAINS = ("valor.globo.com", "g1.globo.com", "gshow.globo.com")


def get_agro_news():
  """
  Busca notícias via GNews (https://gnews.io/) e filtra apenas fontes Globo (gshow/g1) e Valor Econômico.
  Requer NEWS_API_KEY configurada no ambiente.
  """
  if not NEWS_API_KEY:
    return SAMPLE_NEWS

  url = "https://gnews.io/api/v4/search"
  params = {
      "q": "agro OR agronegócio OR soja OR milho OR trigo OR fertilizante OR 3tentos OR dcm OR agroindústria OR agricultura OR slc OR bunge OR cargill OR amaggi",
      "lang": "pt",
      "max": 12,
      "token": NEWS_API_KEY,
      "sortby": "publishedAt",
  }

  try:
    response = requests.get(url, params=params, timeout=8)
  except requests.RequestException:
    return SAMPLE_NEWS

  if response.status_code != 200:
    return SAMPLE_NEWS

  data = response.json()

  articles = [
      {
          "title": a.get("title"),
          "url": a.get("url"),
          "source": a.get("source"),
          "publishedAt": a.get("publishedAt"),
          "image": a.get("image"),
          "description": a.get("description"),
      }
      for a in data.get("articles", [])
      if a.get("title") and a.get("url")
  ]

  def allowed(url):
    if not url:
      return False
    return any(domain in url for domain in ALLOWED_DOMAINS)

  articles = [a for a in articles if allowed(a.get("url"))]

  return articles or SAMPLE_NEWS
