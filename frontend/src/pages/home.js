import { initCarousel } from "../components/carousel"
import { getAgroNews } from "../api"

export function renderHome() {

  setTimeout(() => {
    initCarousel()
    loadNews()
  }, 0)

  async function loadNews() {
    const box = document.getElementById("agro-news")
    if (!box) return
    const data = await getAgroNews()
    if (!data.length) {
      box.innerHTML = "<p class='note'>Sem notícias no momento.</p>"
      return
    }
    let idx = 0
    const renderChunk = () => {
      const slice = data.slice(idx, idx + 3)
      if (!slice.length) {
        idx = 0
        return renderChunk()
      }
      box.innerHTML = `
        <div class="card-grid">
          ${slice.map(n => `
            <div class="card">
              <p class="eyebrow">${n.source ?? "Fonte desconhecida"}</p>
              <h3 style="margin:4px 0 6px 0; font-size:16px; font-weight:700;">${n.title}</h3>
              <p class="note">${new Date(n.publishedAt).toLocaleDateString("pt-BR")}</p>
              <a href="${n.url}" target="_blank" style="font-weight:600; color:#0f5b4a;">Ler matéria</a>
            </div>
          `).join("")}
        </div>
      `
      idx = (idx + 3) % data.length
    }
    renderChunk()
    setInterval(renderChunk, 9000)
  }

  return `
    <div class="intro-section">

    <div class="intro-container">
        <h1>DCM Membros AgroInsper - 2026.1</h1>

        <p class="intro-lead">
        Nosso projeto analisa a viabilidade e a criação de valor na Joint Venture entre 3tentos e Caramuru,
        com foco na expansão da capacidade de esmagamento e fortalecimento da originação de grãos.
        Avaliamos sinergias operacionais, logísticas e comerciais, além dos impactos financeiros como geração
        de caixa, TIR e payback.
        </p>

        <p>
            Concentramos todas as métricas e racionais utilizados durante todo o nosso projeto,
            além de mostrar a trajetória dele e cada um dos membros do grupo.
        </p>
        <p>
            Navegue pelos cards abaixo para acessar as páginas de cada um dos nossos pilares de análise.
        </p>

    </div>

    </div>
    <div class="card-grid">

        <a href="/3tentos" data-link class="card card-link">
            <h3>3Tentos</h3>
            <p>Modelo integrado: insumos, indústria e trading para capturar margens na cadeia de grãos.</p>
        </a>

        <a href="/caramuru" data-link class="card card-link">
            <h3>Caramuru</h3>
            <p>Originação forte, logística própria e portfólio de óleos, farelos e biocombustíveis.</p>
        </a>

        <a href="/porto" data-link class="card card-link">
            <h3>Porto</h3>
            <p>Ativo logístico para destravar fluxo do Centro-Oeste e reduzir custo por tonelada.</p>
        </a>

        <a href="/soja" data-link class="card card-link">
            <h3>Soja</h3>
            <p>Fundamentos, basis e margens do complexo soja na JV.</p>
        </a>
        <a href="/milho" data-link class="card card-link">
            <h3>Milho</h3>
            <p>Demanda, etanol de milho e spreads logísticos.</p>
        </a>

        <a href="/farelo" data-link class="card card-link">
            <h3>Farelo</h3>
            <p>Drivers de preço, basis e participação no mix de receita.</p>
        </a>

        <a href="/insumos" data-link class="card card-link">
            <h3>Insumos</h3>
            <p>Mercado de fertilizantes e alavancas de compra para produtores.</p>
        </a>

    </div>

    <div class="home-carousel-section">
      <h2>Galeria do Projeto</h2>

      <div class="swiper small-swiper">
        <div class="swiper-wrapper">

            <div class="swiper-slide">
                <img src="/assets/reuniao-COO.png" />
                <div class="slide-caption">
                Reunião com o COO da 3Tentos, discutindo estratégias, desafios do setor e o plano de expansão.
                </div>
            </div>

            <div class="swiper-slide">
                <img src="/assets/reuniao-ubs.jpeg" />
                <div class="slide-caption">
                Primeira visita à UBS, com apresentação do projeto e discussão sobre nossos próximos passos.
                </div>
            </div>

          <div class="swiper-slide">
            <img src="/assets/reuniaoCaramuru.png" />
            <div class="slide-caption">
            Reunião com o antigo Head de logística e portos da Caramuru.
            </div>
          </div>
          <div class="swiper-slide">
            <img src="/assets/rd-igc1.jpeg" />
            <div class="slide-caption">
            Primeiro Roadshow na IGC Partners, com apresentação do projeto para a banca e feedbacks valiosos para aprimorar nossa análise.
            </div>
          </div>

        </div>

        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-pagination"></div>
      </div>
    </div>

    <section class="info-section" style="margin-top:32px;">
      <div class="page-heading" style="gap:4px;">
        <p class="eyebrow">Notícias do Agro</p>
        <h2 style="margin:0;">Últimas manchetes</h2>
        <p class="note">Atualiza em lotes de 3 itens a partir das fontes mais recentes.</p>
      </div>
      <div id="agro-news"></div>
    </section>
  `
}
