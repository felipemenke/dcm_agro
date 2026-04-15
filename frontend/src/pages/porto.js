export function renderPorto() {
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
            <p class="pill">FDA</p>
            <h3 style="margin: 10px 0 8px;">Fundo de Desenvolvimento da Amazônia</h3>
            <p><strong>Visão geral:</strong> instrumento de financiamento voltado para promover o desenvolvimento econômico sustentável da região Norte do Brasil.</p>
            <p><strong>Como atua:</strong> participa diretamente no financiamento de projetos estruturantes, com foco em infraestrutura, logística, energia, agroindústria e indústria de base.</p>
            <ul class="feature-list">
              <li>Destinado a projetos localizados na área de atuação da Sudam.</li>
              <li>Foco em empreendimentos com impacto econômico e social relevante.</li>
              <li>Pode financiar uma parcela significativa do CAPEX do projeto.</li>
              <li>Exige aprovação técnica e enquadramento nas diretrizes regionais.</li>
              <li>Necessidade de comprovação de viabilidade econômica e ambiental.</li>
              <li>Prazos longos e condições favorecidas, compatíveis com projetos estruturais.</li>
            </ul>
          </div>

          <div>
            <p class="pill">FNO</p>
            <h3 style="margin: 10px 0 8px;">Fundo Constitucional de Financiamento do Norte</h3>
            <p><strong>Visão geral:</strong> linha de crédito operada pelo Banco da Amazônia para fomentar o desenvolvimento econômico da região Norte.</p>
            <p><strong>Como atua:</strong> oferece financiamento com condições diferenciadas para atividades produtivas, com forte presença no agronegócio, incluindo custeio, investimento e industrialização.</p>
            <ul class="feature-list">
              <li>Exclusivo para a região Norte do Brasil.</li>
              <li>Operado principalmente pelo Banco da Amazônia.</li>
              <li>Taxas de juros reduzidas em relação ao mercado.</li>
              <li>Condições favorecidas para pequenos, médios e grandes produtores.</li>
              <li>Prazos de pagamento estendidos, com possibilidade de carência.</li>
              <li>Linhas específicas para investimento, custeio e inovação.</li>
              <li>Incentivos adicionais para práticas sustentáveis.</li>
            </ul>
          </div>

          <div>
            <p class="pill">BNDES</p>
            <h3 style="margin: 10px 0 8px;">Banco Nacional de Desenvolvimento Econômico e Social</h3>
            <p><strong>Visão geral:</strong> principal instrumento de financiamento de longo prazo do Brasil, apoiando investimentos em infraestrutura, logística, indústria e agronegócio.</p>
            <p><strong>Como atua:</strong> oferece linhas de crédito diretas e indiretas via instituições financeiras credenciadas, financiando projetos de expansão, modernização e implantação de empreendimentos.</p>
            <ul class="feature-list">
              <li>Atuação em todo o território nacional.</li>
              <li>Financiamento de projetos de médio e grande porte.</li>
              <li>Taxas de juros geralmente baseadas na TLP (Taxa de Longo Prazo).</li>
              <li>Prazos longos, com períodos de carência conforme o projeto.</li>
              <li>Exigência de garantias e análise de crédito rigorosa.</li>
              <li>Necessidade de comprovação de viabilidade econômica, financeira e ambiental.</li>
              <li>Pode financiar máquinas, equipamentos, obras e serviços.</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="info-section">
        <h2>Mapa</h2>
        <p class="note">Mapa temático: distância até Miritituba e principais corredores logísticos (rodoviários, hidroviários e ferroviários). As distâncias são aproximadas e têm caráter exclusivamente ilustrativo.</p>
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
