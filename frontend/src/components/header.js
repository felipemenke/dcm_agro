import { getTicker, getSemiannual } from "../api"

export async function renderHeader() {
  const [data, farelo] = await Promise.all([
    getTicker(),
    getSemiannual("ZM=F").catch(() => [])
  ])

  const format = item => {
    if (item?.price === null || item?.price === undefined) return "N/A"
    const changeText = Number.isFinite(item?.change) ? ` (${item.change}%)` : ""
    return `${item.price}${changeText}`
  }

  const formatPrice = value => {
    if (value === undefined || value === null || Number.isNaN(value)) return "N/A"
    return Number(value).toFixed(2)
  }

  const calcVol = series => {
    if (!Array.isArray(series) || series.length === 0) return { price: null, change: null }
    const last = series[series.length - 1]?.price
    const prev = series.length > 1 ? series[series.length - 2]?.price : null
    const change = prev ? ((last - prev) / prev) * 100 : null
    return { price: last, change }
  }

  const fareloVol = calcVol(farelo)

  return `
    <div class="header">
      
        <div class="header-top">
            <a class="logo-group" href="/" data-link>
            <img class="logo-agro" src="/assets/agroinsper-logo.png" alt="AgroInsper" />
            <div class="logo-divider"></div>
            <img class="logo-3tentos" src="/assets/3tentos-logo.png" alt="3Tentos" />
            </a>

            <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false">&#9776;</button>

            <div class="nav">
                <a href="/" data-link>Início</a>
                <a href="/3tentos" data-link>3Tentos</a>
                <a href="/caramuru" data-link>Caramuru</a>
                <a href="/porto" data-link>Porto</a>
                <a href="/soja" data-link>Soja</a>
                <a href="/milho" data-link>Milho</a>
                <a href="/trigo" data-link>Trigo</a>
                <a href="/farelo" data-link>Farelo</a>
                <a href="/insumos" data-link>Insumos</a>
            </div>
        </div>

      <div class="ticker-bar">
        <div class="ticker-marquee">
          <div class="ticker-track">
            <span>SOJA: ${format(data.soja)}</span>
            <span>MILHO: ${format(data.milho)}</span>
            <span>FARELO: ${formatPrice(fareloVol.price)} (${fareloVol.change !== null ? fareloVol.change.toFixed(2) : "N/A"}%)</span>
            <span>TRIGO: ${format(data.trigo)}</span>
            <span>TTEN3: ${format(data.tres_tentos)}</span>
            <span>SOJA: ${format(data.soja)}</span>
            <span>MILHO: ${format(data.milho)}</span>
            <span>FARELO: ${formatPrice(fareloVol.price)} (${fareloVol.change !== null ? fareloVol.change.toFixed(2) : "N/A"}%)</span>
            <span>TRIGO: ${format(data.trigo)}</span>
            <span>TTEN3: ${format(data.tres_tentos)}</span>
          </div>
        </div>
      </div>

    </div>
  `
}
