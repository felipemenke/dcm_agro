export function renderFooter() {
  return `
    <div class="footer">

      <div class="footer-title">
        Analysts:
      </div>

      <div class="footer-grid">

        ${member("Enzo Luccarelli Terrin", "+55 (11) 97645-6786", "enzolt@al.insper.edu.br", "https://www.linkedin.com/in/enzo-terrin-920488336/", "/assets/enzo.jpeg")}
        ${member("Felipe Lima Araújo", "+55 (71) 98820-9273", "felipela2@al.insper.edu.br", "https://www.linkedin.com/in/felipe-lima-ara%C3%BAjo-477a3a325/?locale=pt_BR", "/assets/lima.jpeg")}
        ${member("Felipe Menke", "+55 (11) 94182-8148", "felipelm4@al.insper.edu.br", "https://www.linkedin.com/in/felipemenke/", "/assets/menke.jpeg")}
        ${member("Gabriela Paranhos", "+55 (34) 99815-7707", "gabrielacpf@al.insper.edu.br", "https://www.linkedin.com/in/gabriela-paranhos-439b68372/", "/assets/gabi.jpeg")}
        ${member("Romulo Tude Aureliano", "+55 (62) 99847-1696", "romulot@al.insper.edu.br", "https://www.linkedin.com/in/romulo-tude-aureliano-de-lima-0bb580321/", "/assets/romulo.jpeg")}

      </div>
    </div>
  `
}

function member(name, phone, email, linkedin, photo) {
  return `
    <div class="footer-member">

      <div class="member-photo">
        <img src="${photo}" alt="${name}" />
      </div>

      <div class="member-info">
        <div class="member-name">${name}</div>
        <div class="member-phone">${phone}</div>
        <div class="member-email">${email}</div>

        <a href="${linkedin}" target="_blank" class="linkedin-icon">
          <img src="/assets/linkedin.png" alt="LinkedIn" />
        </a>
      </div>

    </div>
  `
}