const API_BASE = (
  import.meta.env.VITE_API_URL ||
  import.meta.env.API_BASE ||
  "http://127.0.0.1:8000"
).replace(/\/$/, "");

export async function requestJSON(path, fallback) {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) return fallback;
    return await response.json();
  } catch (error) {
    console.error(`Falha ao chamar ${path}:`, error);
    return fallback;
  }
}

export async function getTicker() {
    return requestJSON("/api/market/ticker", {});
}

export async function getQuarterly(asset) {
    return requestJSON(`/api/market/quarterly?asset=${asset}`, []);
}

export async function getSemiannual(asset) {
  return requestJSON(`/api/market/semiannual?asset=${asset}`, [])
}

export async function getAgroNews() {
  const json = await requestJSON("/api/agro-news", { data: [] })
  return json.data || []
}

export async function getTresTentosHistory() {
  return requestJSON("/api/3tentos/history", [])
}

export async function getTresTentosSummary() {
  return requestJSON("/api/3tentos/summary", {})
}
