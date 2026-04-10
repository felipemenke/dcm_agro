import { getSemiannual } from "../api"
import Chart from "chart.js/auto"

export async function renderMilho() {

  setTimeout(async () => {
    const data = await getSemiannual("ZC=F")

    const labels = data.map(i => i.semester)
    const prices = data.map(i => i.price)

    new Chart(document.getElementById("chart-milho"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Milho - Média Semestral",
          data: prices,
          borderColor: "#05c0f4",
          backgroundColor: "rgba(5,192,244,0.18)",
          tension: 0.3
        }]
      }
    })
  }, 0)

  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Commodities</p>
        <h1>Milho</h1>
        <p class="lede">Commodity estratégica para alimentação e energia, com peso crescente no etanol e na safrinha.</p>
      </div>

      <section class="info-section">
        <h2>Visão Geral e Contexto de Mercado</h2>
        <p>O milho é uma commodity estratégica tanto para alimentação quanto para energia. O Brasil é um dos maiores exportadores globais, com preços também referenciados pela CBOT. Possui forte impacto na balança comercial e na cadeia de proteína animal.</p>
        <span class="trend-pill">Tendência 2025/2026: crescimento do uso para etanol de milho e aumento da segunda safra (safrinha).</span>
      </section>

      <section class="info-section">
        <h2>Tratamento de Mercado</h2>
        <p>Apresenta alta liquidez, com equilíbrio entre consumo interno (ração, etanol) e exportação. Compradores incluem indústrias de ração, usinas e tradings internacionais.</p>
      </section>

      <section class="info-section">
        <h2>Cuidados na Exportação e Manuseio</h2>
        <ul>
          <li>Umidade abaixo de 14% para evitar fermentação.</li>
          <li>Suscetibilidade a fungos e micotoxinas: ventilação e controle de pragas são críticos.</li>
          <li>Transporte a granel, com segregação por qualidade.</li>
        </ul>
        <p class="note">Sugestão visual: grãos em silo com sensores de temperatura + inspeção de qualidade.</p>
      </section>

      <section class="info-section">
        <h2>Preço</h2>
        <p class="note">Média semestral (CBOT). Acompanhe a trajetória recente.</p>
        <div class="chart-wrapper">
          <canvas id="chart-milho" style="height: 200px; min-height: 180px; max-height: 220px;"></canvas>
        </div>
      </section>
    </div>
  `
}
