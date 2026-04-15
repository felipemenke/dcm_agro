import { getSemiannual } from "../api"
import Chart from "chart.js/auto"

export function renderSoja() {
  setTimeout(async () => {
    const data = await getSemiannual("ZS=F")

    const labels = data.map(i => i.semester)
    const prices = data.map(i => i.price)

    new Chart(document.getElementById("chart-soja"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Soja - Média Semestral",
          data: prices,
          borderColor: "#0072b8",
          backgroundColor: "rgba(0,114,184,0.15)",
          tension: 0.3
        }]
      }
    })
  }, 0)

  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Commodities</p>
        <h1>Soja</h1>
        <p class="lede">Base da balança comercial brasileira e principal origem de proteína vegetal para o mundo.</p>
      </div>

      <section class="info-section">
        <h2>Visão Geral e Contexto de Mercado</h2>
        <p>A soja é a principal commodity do agronegócio brasileiro e uma das mais relevantes no comércio global. O Brasil é o maior exportador mundial, com forte demanda da China. A precificação é referenciada pela Bolsa de Chicago (CBOT), acrescida de prêmios logísticos regionais. A soja possui papel central na balança comercial brasileira, sendo responsável por uma parcela significativa das exportações do país.</p>
        <span class="trend-pill">Tendência 2025/2026: aumento da demanda por farelo e óleo, impulsionado por biocombustíveis e consumo de proteína animal.</span>
      </section>

      <section class="info-section">
        <h2>Tratamento de Mercado</h2>
        <p>A soja possui alta liquidez e é predominantemente voltada para exportação. Os principais compradores são tradings globais, indústrias esmagadoras e países importadores, especialmente asiáticos. O mercado opera tanto no físico quanto via hedge em bolsas internacionais.</p>
      </section>

      <section class="info-section">
        <h2>Cuidados na Exportação e Manuseio</h2>
        <ul>
          <li>Umidade ideal abaixo de 13% para evitar deterioração.</li>
          <li>Armazenagem em silos com monitoramento de temperatura e aeração.</li>
          <li>Normas fitossanitárias rigorosas exigem ausência de pragas e impurezas.</li>
          <li>Transporte majoritário a granel, com limpeza para evitar contaminação cruzada.</li>
        </ul>
        <p class="note">Sugestão visual: silos metálicos com sistema de aeração + carregamento de navio graneleiro.</p>
      </section>

      <section class="info-section">
        <h2>Preço</h2>
        <p class="note">Média semestral (CBOT + prêmios). Visualize a trajetória recente.</p>
        <div class="chart-wrapper">
          <canvas id="chart-soja" style="height: 200px; min-height: 180px; max-height: 220px;"></canvas>
        </div>
      </section>
    </div>
  `
}
