const API_BASE = "http://127.0.0.1:8000";

export async function getTicker() {
    const response = await fetch(`${API_BASE}/api/market/ticker`);
    return await response.json();
}

export async function getQuarterly(asset) {
    const response = await fetch(`${API_BASE}/api/market/quarterly?asset=${asset}`);
    return await response.json();
}

export async function getSemiannual(asset) {
  const response = await fetch(`${API_BASE}/api/market/semiannual?asset=${asset}`)
  return await response.json()
}

export async function getAgroNews() {
  const response = await fetch(`${API_BASE}/api/agro-news`)
  const json = await response.json()
  return json.data || []
}
