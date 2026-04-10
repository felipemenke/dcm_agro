export async function renderPorto() {
  return `
    <div class="page">
      <div class="page-heading">
        <p class="eyebrow">Infraestrutura</p>
        <h1>Porto</h1>
        <p class="lede">Ativo estratÃ©gico para destravar logÃ­stica, reduzir custo por tonelada e aumentar competitividade das exportaÃ§Ãµes.</p>
      </div>

      <section class="info-section">
        <h2>Contexto estratÃ©gico</h2>
        <p>O projeto do porto surge como um movimento fundamental para ampliar a eficiÃªncia logÃ­stica e capturar ganhos estruturais ao longo da cadeia de escoamento de grÃ£os e derivados. Inserido em uma regiÃ£o-chave para a expansÃ£o agrÃ­cola, o ativo visa reduzir custos de transporte, aumentar a competitividade das exportaÃ§Ãµes e mitigar gargalos logÃ­sticos historicamente presentes no Brasil.</p>
        <p>A iniciativa ganha robustez ao ser estruturada como uma joint venture com a Caramuru, empresa consolidada na regiÃ£o e reconhecida pelo seu know-how em operaÃ§Ãµes portuÃ¡rias e logÃ­stica integrada. A parceria reduz riscos de execuÃ§Ã£o e agrega expertise operacional, relacionamento comercial e eficiÃªncia na gestÃ£o do ativo desde o inÃ­cio.</p>
        <p>Conectado Ã  crescente produÃ§Ã£o de grÃ£os no Centro-Oeste e ao avanÃ§o do Arco Norte, o porto encurta distÃ¢ncias atÃ© mercados internacionais, permitindo reduÃ§Ã£o relevante no custo por tonelada transportada.</p>
        <p>O ativo potencializa sinergias com as operaÃ§Ãµes da 3tentos, garantindo maior controle do fluxo logÃ­stico, previsibilidade operacional e melhor gestÃ£o de estoques, com impacto direto na rentabilidade de originaÃ§Ã£o, exportaÃ§Ã£o e processamento.</p>
        <p>Com capacidade de escala e giro, o projeto acelera o escoamento, reduz custos de armazenagem e abre espaÃ§o para atendimento a terceiros, criando nova fonte de receita e diluindo custos fixos.</p>
        <p>Em sÃ­ntese, o porto Ã© um ativo estratÃ©gico que reforÃ§a a 3tentos como plataforma integrada no agronegÃ³cio, combinando capacidade operacional, inteligÃªncia logÃ­stica e acesso eficiente aos mercados internacionais.</p>
      </section>

      <section class="info-section">
        <h2>Mapa</h2>
        <p class="note">Mapa temÃ¡tico: distÃ¢ncia atÃ© Miritituba + corredores rodoviÃ¡rios, hidroviÃ¡rios e ferroviÃ¡rios.</p>
        <div class="chart-wrapper" style="padding:12px; background:#f9fafb; border:1px solid #e5e7eb; border-radius:12px;">
          <picture style="display:block;">
            <source srcset="/assets/mapa-porto.png" type="image/png" />
            <img
              src="/assets/mapa-porto.svg"
              alt="Mapa de distÃ¢ncia atÃ© Miritituba com corredores logÃ­sticos (PA+MT)"
              style="width:100%; height:auto; display:block; border-radius:8px;"
              onerror="this.closest('.chart-wrapper').innerHTML='<p class=&quot;note&quot;>Gere o arquivo mapa-porto.png rodando <code>python mapas/mapa_corredores_miritituba.py</code>.</p>'"
            />
          </picture>
        </div>
      </section>
    </div>
  `
}
