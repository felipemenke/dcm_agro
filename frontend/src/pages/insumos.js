import { getSemiannual } from "../api"
import Chart from "chart.js/auto"

export function renderInsumos() {

  setTimeout(async () => {
    const data = await getSemiannual("CF")

    const labels = data.map(i => i.semester)
    const prices = data.map(i => i.price)

    new Chart(document.getElementById("chart-insumos"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Fertilizantes - Proxy Global",
          data: prices,
          borderColor: "#4a080a",
          backgroundColor: "rgba(74,8,10,0.18)",
          tension: 0.3
        }]
      }
    })
  }, 0)

  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Input de Produção</p>
        <h1>Insumos</h1>
        <p class="lede">Fertilizantes, defensivos e sementes que sustentam a produtividade agrícola brasileira.</p>
      </div>

      <section class="info-section">
        <h2>Visão Geral e Contexto de Mercado</h2>
        <p>Os insumos agrícolas incluem fertilizantes, defensivos e sementes, sendo fundamentais para produtividade. O Brasil é altamente dependente de importações, especialmente de fertilizantes. Os preços são influenciados por mercados globais e commodities energéticas.</p>
        <span class="trend-pill">Tendência 2025/2026: volatilidade nos fertilizantes e avanço de tecnologias biológicas.</span>
      </section>

      <section class="info-section">
        <h2>Tratamento de Mercado</h2>
        <p>Mercado com alta demanda interna e menor foco em exportação. Compradores são produtores rurais e distribuidores. A negociação pode envolver contratos antecipados e crédito agrícola.</p>
      </section>

      <section class="info-section">
        <h2>Cuidados na Exportação e Manuseio</h2>
        <ul>
          <li>Fertilizantes: controle de umidade para evitar empedramento.</li>
          <li>Defensivos: normas rigorosas de transporte e armazenamento (produtos perigosos).</li>
          <li>Armazenagem segregada e ventilada; transporte a granel ou embalado conforme regulação.</li>
        </ul>
        <p class="note">Sugestão visual: armazém de fertilizantes + logística com big bags.</p>
      </section>

      <section class="info-section">
        <h2>Preço</h2>
        <p class="note">Proxy global de fertilizantes (média semestral).</p>
        <div class="chart-wrapper">
          <canvas id="chart-insumos" style="height: 200px; min-height: 180px; max-height: 220px;"></canvas>
        </div>
      </section>
    </div>
  `
}
