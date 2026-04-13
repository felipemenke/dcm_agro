import Chart from "chart.js/auto"
import { getQuarterly } from "../api"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"
const formatNumber = value =>
  Number.isFinite(value)
    ? value.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "—"

if (Chart?.defaults?.font) {
  Chart.defaults.font.family = "Montserrat, sans-serif"
}

export async function renderTresTentos() {

  setTimeout(async () => {
    const errorBox = document.getElementById("tres-error")
    const summaryBox = document.getElementById("tres-summary")
    const chartCanvas = document.getElementById("tres-chart")
    const priceCanvas = document.getElementById("tres-price-chart")
    const periodSelect = document.getElementById("tres-period")

    const showError = msg => {
      if (errorBox) errorBox.textContent = msg
    }

    const periods = [
      { value: "all", label: "Todos os trimestres" },
      { value: "last4", label: "Últimos 4 trimestres" },
      { value: "last8", label: "Últimos 8 trimestres" },
      { value: "since2024", label: "A partir de 2024" },
      { value: "since2023", label: "A partir de 2023" },
      { value: "year2025", label: "Ano de 2025" },
      { value: "year2024", label: "Ano de 2024" },
      { value: "year2023", label: "Ano de 2023" },
      { value: "year2022", label: "Ano de 2022" },
      { value: "year2021", label: "Ano de 2021" }
    ]

    const toYear = quarter => parseInt(quarter?.split("-")[0] ?? "0", 10)

    const filterHistory = (history, period) => {
      if (!history?.length) return []
      switch (period) {
        case "last4":
          return history.slice(-4)
        case "last8":
          return history.slice(-8)
        case "since2024":
          return history.filter(i => toYear(i.quarter) >= 2024)
        case "since2023":
          return history.filter(i => toYear(i.quarter) >= 2023)
        case "year2025":
          return history.filter(i => toYear(i.quarter) === 2025)
        case "year2024":
          return history.filter(i => toYear(i.quarter) === 2024)
        case "year2023":
          return history.filter(i => toYear(i.quarter) === 2023)
        case "year2022":
          return history.filter(i => toYear(i.quarter) === 2022)
        case "year2021":
          return history.filter(i => toYear(i.quarter) === 2021)
        default:
          return history
      }
    }

    const computeSummary = history => {
      if (!history?.length) return null
      const latest = history[history.length - 1]
      const prev = history.length > 1 ? history[history.length - 2] : latest
      const first = history[0]

      const revenue_sum = history.reduce((acc, cur) => acc + (cur.revenue ?? 0), 0)
      const ebitda_sum = history.reduce((acc, cur) => acc + (cur.ebitda ?? 0), 0)
      const net_debt_avg = history.reduce((acc, cur) => acc + (cur.net_debt ?? 0), 0) / history.length

      const revenue_growth_qoq = prev.revenue
        ? ((latest.revenue - prev.revenue) / prev.revenue) * 100
        : null

      const net_debt_change_period = first.net_debt
        ? ((latest.net_debt - first.net_debt) / first.net_debt) * 100
        : null

      const ebitda_margin_avg = revenue_sum
        ? (ebitda_sum / revenue_sum) * 100
        : null

      return {
        latest_quarter: latest.quarter,
        revenue_sum,
        ebitda_sum,
        net_debt_latest: latest.net_debt,
        net_debt_avg,
        revenue_growth_qoq_pct: revenue_growth_qoq,
        ebitda_margin_pct: ebitda_margin_avg,
        net_debt_change_period_pct: net_debt_change_period
      }
    }

    let chartInstance = null
    let priceChartInstance = null
    let historyData = []
    let priceData = []

    const renderUI = period => {
      const filtered = filterHistory(historyData, period)

      if (!filtered.length) {
        showError("Sem dados de histórico para exibir nesse período")
        if (chartInstance) {
          chartInstance.destroy()
          chartInstance = null
        }
        if (summaryBox) summaryBox.innerHTML = ""
        return
      }

      showError("")

      const summary = computeSummary(filtered)
      if (summaryBox && summary) {
        summaryBox.innerHTML = `
          <div class="card">
            <p>Período selecionado</p>
            <strong>${periods.find(p => p.value === period)?.label ?? "—"}</strong>
          </div>
          <div class="card">
            <p>Último quarter</p>
            <strong>${summary.latest_quarter ?? "—"}</strong>
          </div>
          <div class="card">
            <p>Receita do período</p>
            <strong>R$ ${summary.revenue_sum?.toFixed(2) ?? "—"} mi</strong>
          </div>
          <div class="card">
            <p>EBITDA do período</p>
            <strong>R$ ${summary.ebitda_sum?.toFixed(2) ?? "—"} mi</strong>
          </div>
          <div class="card">
            <p>Dívida líquida (último)</p>
            <strong>R$ ${summary.net_debt_latest?.toFixed(2) ?? "—"} mi</strong>
          </div>
          <div class="card">
            <p>Dívida líquida média</p>
            <strong>R$ ${summary.net_debt_avg?.toFixed(2) ?? "—"} mi</strong>
          </div>
          <div class="card">
            <p>Crescimento de receita QoQ (último)</p>
            <strong>${summary.revenue_growth_qoq_pct?.toFixed(2) ?? "—"}%</strong>
          </div>
          <div class="card">
            <p>Margem EBITDA média</p>
            <strong>${summary.ebitda_margin_pct?.toFixed(2) ?? "—"}%</strong>
          </div>
          <div class="card">
            <p>Variação da dívida líquida no período</p>
            <strong>${summary.net_debt_change_period_pct?.toFixed(2) ?? "—"}%</strong>
          </div>
        `
      }

      if (chartCanvas) {
        if (chartInstance) chartInstance.destroy()

        const labels = filtered.map(i => i.quarter)

        chartInstance = new Chart(chartCanvas, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Receita (R$ mi)",
                data: filtered.map(i => i.revenue),
                borderColor: "#0f1633",
                backgroundColor: "rgba(15,22,51,0.12)",
                borderWidth: 2,
                tension: 0.3
              },
              {
                label: "EBITDA (R$ mi)",
                data: filtered.map(i => i.ebitda),
                borderColor: "#05c0f4",
                backgroundColor: "rgba(5,192,244,0.15)",
                borderWidth: 2,
                tension: 0.3
              },
              {
                label: "Dívida líquida (R$ mi)",
                data: filtered.map(i => i.net_debt),
                borderColor: "#93201f",
                backgroundColor: "rgba(147,32,31,0.15)",
                borderWidth: 2,
                tension: 0.3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: { position: "top" },
              tooltip: {
                callbacks: {
                  label: ctx => `${ctx.dataset.label}: ${formatNumber(ctx.parsed.y)}`
                }
              }
            },
            scales: {
              y: { ticks: { callback: v => formatNumber(v) } }
            }
          }
        })
      }

      if (priceCanvas && priceData.length) {
        if (priceChartInstance) priceChartInstance.destroy()

        const labels = priceData.map(i => i.quarter)

        priceChartInstance = new Chart(priceCanvas, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "TTEN3 - Média Trimestral (R$)",
                data: priceData.map(i => i.price),
                borderColor: "#0072b8",
                backgroundColor: "rgba(0,114,184,0.15)",
                borderWidth: 2,
                tension: 0.3
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: { position: "top" },
              tooltip: {
                callbacks: {
                  label: ctx => `${ctx.dataset.label}: ${formatNumber(ctx.parsed.y)}`
                }
              }
            },
            scales: {
              y: { ticks: { callback: v => formatNumber(v) } }
            }
          }
        })
      }
    }

    // listener do seletor: re-render assim que houver dados carregados
    if (periodSelect) {
      periodSelect.onchange = () => {
        if (historyData.length) {
          renderUI(periodSelect.value)
        }
      }
    }

    try {
      showError("Carregando dados...")

      const [historyRes, summaryRes, priceRes] = await Promise.all([
        fetch(`${API_URL}/api/3tentos/history`),
        fetch(`${API_URL}/api/3tentos/summary`),
        getQuarterly("TTEN3.SA")
      ])

      if (!historyRes.ok) throw new Error("Falha ao carregar histórico da 3tentos")
      if (!summaryRes.ok) throw new Error("Falha ao carregar resumo da 3tentos")

      const history = await historyRes.json()
      await summaryRes.json() // mantido para compatibilidade; cálculo passa a ser local
      priceData = priceRes ?? []

      historyData = history
      if (!historyData?.length) {
        showError("Sem dados de histórico para exibir")
        return
      }

      renderUI(periodSelect?.value ?? "all")
      showError("")
    } catch (err) {
      showError(err.message || "Erro ao carregar dados da 3tentos")
    }

  }, 0)

  return `
    <div class="space-y-6 page">
      <div class="page-heading">
        <p class="eyebrow">Empresa</p>
        <h1>3tentos (TTEN3)</h1>
        <p class="lede">Modelo integrado de varejo de insumos, indústria e trading para capturar valor em toda a cadeia de soja e milho.</p>
      </div>

      <section class="info-section">
        <div style="display:grid; gap:14px; grid-template-columns: repeat(auto-fit,minmax(260px,1fr));">
          <p><strong>Varejo de insumos:</strong> portfólio completo (sementes, fertilizantes, defensivos) com assistência técnica próxima ao produtor.</p>
          <p><strong>Indústria:</strong> processamento de soja e milho em farelo, óleo e etanol de milho (DDGS), elevando resiliência e margens.</p>
          <p><strong>Trading:</strong> comercialização interna e externa, alavancando logística própria e capacidade de originação.</p>
          <p><strong>Sinergias:</strong> integração reduz custo, dilui risco e aumenta previsibilidade de oferta; expansão do Centro-Oeste para o Norte reforça o pipeline de crescimento.</p>
        </div>
      </section>

      <section class="info-section">
        <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
          <h2 style="margin:0;">Filtro de período</h2>
          <select id="tres-period" style="padding: 6px 10px; border-radius: 8px; border: 1px solid #cbd5e1;">
            <option value="all">Todos os trimestres</option>
            <option value="last4">Últimos 4 trimestres</option>
            <option value="last8">Últimos 8 trimestres</option>
            <option value="since2024">A partir de 2024</option>
            <option value="since2023">A partir de 2023</option>
            <option value="year2025">Ano de 2025</option>
            <option value="year2024">Ano de 2024</option>
            <option value="year2023">Ano de 2023</option>
            <option value="year2022">Ano de 2022</option>
            <option value="year2021">Ano de 2021</option>
          </select>
        </div>
        <p class="note" style="margin-top:8px;">Escolha o recorte temporal para recalcular cards, margens e gráficos imediatamente.</p>
      </section>

      <section>
        <h2>Resumo rápido</h2>
        <div id="tres-summary" class="card-grid" style="row-gap: 12px; column-gap: 12px;"></div>
      </section>

      <section style="margin-top: 8px;">
        <h2>Gráfico interativo</h2>
        <div id="tres-error" style="min-height: 1.2rem; color: #d32f2f;"></div>
        <div style="max-height: 240px; min-height: 180px; height: 200px; width: 100%;">
          <canvas id="tres-chart" style="width: 100%; height: 100%;"></canvas>
        </div>
      </section>

      <section style="margin-top: 8px;">
        <h2>Cotação TTEN3</h2>
        <p class="note">Média trimestral.</p>
        <div style="max-height: 240px; min-height: 180px; height: 200px; width: 100%;">
          <canvas id="tres-price-chart" style="width: 100%; height: 100%;"></canvas>
        </div>
      </section>
    </div>
  `
}
