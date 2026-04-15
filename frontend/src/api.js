const API_BASE = (import.meta.env.VITE_API_URL || "http://127.0.0.1:8000").replace(/\/$/, "");

async function fetchJSON(path, fallback) {
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
    return fetchJSON("/api/market/ticker", {});
}

export async function getQuarterly(asset) {
    return fetchJSON(`/api/market/quarterly?asset=${asset}`, []);
}

export async function getSemiannual(asset) {
  return fetchJSON(`/api/market/semiannual?asset=${asset}`, [])
}

export async function getAgroNews() {
  const json = await fetchJSON("/api/agro-news", { data: [] })
  return json.data || []
}
