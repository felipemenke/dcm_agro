import { getSemiannual } from "../api"
import Chart from "chart.js/auto"

export async function renderTrigo() {

  setTimeout(async () => {
    const data = await getSemiannual("ZW=F")

    const labels = data.map(i => i.semester)
    const prices = data.map(i => i.price)

    new Chart(document.getElementById("chart-trigo"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Trigo - Média Semestral",
          data: prices,
          borderColor: "#0f1633",
          backgroundColor: "rgba(15,22,51,0.14)",
          tension: 0.3
        }]
      }
    })
  }, 0)

  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Commodities</p>
        <h1>Trigo</h1>
        <p class="lede">Base da segurança alimentar global; o Brasil é importador líquido e sensível a movimentos de preço externos.</p>
      </div>

      <section class="info-section">
        <h2>Visão Geral e Contexto de Mercado</h2>
        <p>O trigo é essencial para a segurança alimentar global, sendo base para produtos como farinha e massas. Diferente da soja e do milho, o Brasil é importador líquido. Os preços são formados na CBOT e influenciados por fatores geopolíticos.</p>
        <span class="trend-pill">Tendência 2025/2026: maior volatilidade devido a clima e conflitos em regiões produtoras.</span>
      </section>

      <section class="info-section">
        <h2>Tratamento de Mercado</h2>
        <p>O mercado é menos voltado à exportação no Brasil, com foco no abastecimento interno. Moinhos são os principais compradores, além de tradings internacionais.</p>
      </section>

      <section class="info-section">
        <h2>Cuidados na Exportação e Manuseio</h2>
        <ul>
          <li>Controle de umidade e qualidade industrial (glúten, PH) é rigoroso.</li>
          <li>Armazenagem deve evitar mistura de variedades e contaminação.</li>
          <li>Transporte a granel ou em sacaria, dependendo do destino.</li>
        </ul>
        <p class="note">Sugestão visual: análise laboratorial de qualidade do grão + transporte em graneleiro.</p>
      </section>

      <section class="info-section">
        <h2>Preço</h2>
        <p class="note">Média semestral referenciada na CBOT.</p>
        <div class="chart-wrapper">
          <canvas id="chart-trigo" style="height: 200px; min-height: 180px; max-height: 220px;"></canvas>
        </div>
      </section>
    </div>
  `
}
