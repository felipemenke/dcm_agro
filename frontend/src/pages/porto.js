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
        <h2>Estrutura de financiamento</h2>
        <p class="note">A combinação abaixo organiza a dívida do projeto com foco em custo de capital, prazo e aderência regional.</p>

        <div class="info-grid" style="margin-top: 16px;">
          <div>
            <p class="pill">FNA</p>
            <h3 style="margin: 10px 0 8px;">Fundo Constitucional de Financiamento do Norte</h3>
            <p><strong>Visão geral:</strong> fundo público voltado ao desenvolvimento da Região Norte, com forte aderência a projetos de agronegócio, infraestrutura e indústria.</p>
            <p><strong>Como atua:</strong> financia armazenagem, processamento e escoamento com condições diferenciadas para projetos que gerem emprego e produtividade.</p>
            <ul class="feature-list">
              <li>Taxas subsidiadas, abaixo das praticadas pelo mercado.</li>
              <li>Prazos longos, com carência para início do pagamento.</li>
              <li>Percentual financiável elevado, sujeito ao enquadramento do projeto.</li>
              <li>Exige viabilidade econômica, regularidade ambiental e garantias.</li>
            </ul>
            <p class="note">Ponto estratégico: fonte central de funding para projetos no Arco Norte.</p>
          </div>

          <div>
            <p class="pill">FDCO</p>
            <h3 style="margin: 10px 0 8px;">Fundo de Desenvolvimento do Centro-Oeste</h3>
            <p><strong>Visão geral:</strong> instrumento voltado a grandes projetos estruturantes, com foco em infraestrutura, logística e expansão produtiva.</p>
            <p><strong>Como atua:</strong> costuma complementar outras fontes em projetos de maior porte e impacto regional, como portos, ferrovias e polos industriais.</p>
            <ul class="feature-list">
              <li>Foco em projetos estruturantes e de grande escala.</li>
              <li>Prazos longos e compatíveis com infraestrutura.</li>
              <li>Taxas competitivas, associadas a políticas de desenvolvimento regional.</li>
              <li>Processo de aprovação mais rigoroso, com análise técnica e de impacto.</li>
            </ul>
            <p class="note">Ponto estratégico: ideal para portos e corredores de exportação.</p>
          </div>

          <div>
            <p class="pill">BNDES</p>
            <h3 style="margin: 10px 0 8px;">Banco Nacional de Desenvolvimento Econômico e Social</h3>
            <p><strong>Visão geral:</strong> principal financiador de longo prazo do país, com atuação ampla em infraestrutura, logística, energia e agronegócio.</p>
            <p><strong>Como atua:</strong> pode financiar diretamente ou via bancos parceiros, sendo uma referência em projetos de grande porte e alta estruturação.</p>
            <ul class="feature-list">
              <li>Prazos que podem ultrapassar 10 a 20 anos.</li>
              <li>Taxas baseadas em indexadores como a TLP.</li>
              <li>Participação parcial no investimento, conforme a estrutura do projeto.</li>
              <li>Exige estudos de viabilidade detalhados e compliance rigoroso.</li>
            </ul>
            <p class="note">Ponto estratégico: ancora a estrutura de capital e aumenta a credibilidade do projeto.</p>
          </div>
        </div>

        <div style="margin-top: 16px; padding: 16px; border-left: 4px solid var(--accent-red); background: #f8fafc; border-radius: 12px;">
          <p style="margin: 0; font-weight: 600;">
            A estrutura de financiamento combina instrumentos públicos de fomento com linhas de longo prazo, buscando otimizar o custo de capital e garantir aderência às políticas de desenvolvimento regional.
          </p>
        </div>
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
