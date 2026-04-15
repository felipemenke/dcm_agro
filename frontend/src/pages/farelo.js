import { getSemiannual } from "../api"
import Chart from "chart.js/auto"

export function renderFarelo() {

  setTimeout(async () => {
    const data = await getSemiannual("ZM=F")

    const labels = data.map(i => i.semester)
    const prices = data.map(i => i.price)

    new Chart(document.getElementById("chart-farelo"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Farelo - Média Semestral",
          data: prices,
          borderColor: "#93201f",
          backgroundColor: "rgba(147,32,31,0.18)",
          tension: 0.3
        }]
      }
    })
  }, 0)

  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Derivados</p>
        <h1>Farelo de Soja</h1>
        <p class="lede">Principal insumo proteico para ração animal, ligado diretamente ao esmagamento da soja.</p>
      </div>

      <section class="info-section">
        <h2>Visão Geral e Contexto de Mercado</h2>
        <p>O farelo de soja é o principal insumo proteico para ração animal no mundo. Derivado do processamento da soja, tem forte demanda internacional. Sua precificação está correlacionada à CBOT, com influência direta do esmagamento.</p>
        <span class="trend-pill">Tendência 2025/2026: aumento da demanda global por proteína animal e expansão da aquicultura.</span>
      </section>

      <section class="info-section">
        <h2>Tratamento de Mercado</h2>
        <p>Alta liquidez, com foco em exportação e consumo interno. Principais compradores são indústrias de ração, integradoras e mercados asiáticos e europeus.</p>
      </section>

      <section class="info-section">
        <h2>Cuidados na Exportação e Manuseio</h2>
        <ul>
          <li>Produto sensível à umidade: manter seco para evitar deterioração e compactação.</li>
          <li>Armazenagem com controle térmico e prevenção de infestação.</li>
          <li>Transporte a granel ou em pellets, com cuidado para evitar contaminação.</li>
        </ul>
        <p class="note">Sugestão visual: farelo em pellets + carregamento em navio graneleiro.</p>
      </section>

      <section class="info-section">
        <h2>Preço</h2>
        <p class="note">Média semestral (CBOT). Veja a trajetória recente.</p>
        <div class="chart-wrapper">
          <canvas id="chart-farelo" style="height: 200px; min-height: 180px; max-height: 220px;"></canvas>
        </div>
      </section>
    </div>
  `
}
