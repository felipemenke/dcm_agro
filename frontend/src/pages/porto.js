export async function renderPorto() {
  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Infraestrutura</p>
        <h1>Porto</h1>
        <p class="lede">Ativo estratégico para destravar logística, reduzir custo por tonelada e aumentar a competitividade das exportações.</p>
      </div>

      <section class="info-section">
        <h2>Contexto estratégico</h2>
        <p>O porto é peça central para ampliar eficiência logística e capturar ganhos estruturais no escoamento de grãos e derivados. Localizado no eixo Centro-Oeste/Arco Norte, encurta a distância até os mercados internacionais e reduz de forma relevante o custo por tonelada.</p>
        <p>Estruturado em joint venture com a Caramuru, combina know-how portuário, logística integrada e relacionamento comercial, mitigando riscos de execução desde o início.</p>
        <p>O ativo aumenta controle do fluxo, previsibilidade operacional e gestão de estoques, elevando a rentabilidade de originação, exportação e processamento. Atender terceiros gera receita adicional e dilui custos fixos.</p>
      </section>

      <section class="info-section">
        <h2>Mapa</h2>
        <p class="note">Mapa temático: distância até Miritituba + corredores rodoviários, hidroviários e ferroviários.</p>
        <div class="chart-wrapper" style="padding:12px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px;">
          <picture style="display:block;">
            <source srcset="/assets/mapa-porto.png" type="image/png" />
            <img
              src="/assets/mapa-porto.svg"
              alt="Mapa de distância até Miritituba com corredores logísticos (PA+MT)"
              style="width:100%; height:auto; display:block; border-radius:8px;"
              onerror="this.closest('.chart-wrapper').innerHTML='<p class=&quot;note&quot;>Gere o arquivo mapa-porto.png rodando <code>python mapas/mapa_corredores_miritituba.py</code>.</p>'"
            />
          </picture>
        </div>
      </section>
    </div>
  `
}
