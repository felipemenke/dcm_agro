import "./style.css"
import { renderHeader } from "./components/header"
import { router } from "./router"
import { renderFooter } from "./components/footer"

function renderErrorState(error) {
  const message = error?.message || "Erro inesperado ao carregar a interface."

  document.querySelector("#app").innerHTML = `
    <div class="content">
      <section class="info-section">
        <p class="eyebrow">Falha de carregamento</p>
        <h1>O front nao conseguiu renderizar</h1>
        <p class="lede">${message}</p>
        <p class="note">Verifique a variavel <code>VITE_API_URL</code> no Vercel e a disponibilidade do backend.</p>
      </section>
    </div>
  `
}

function renderApp() {
  try {
    const header = renderHeader()
    const page = router()
    const footer = renderFooter()

    document.querySelector("#app").innerHTML = `
      ${header}
      <div class="content">
        ${page}
      </div>
      ${footer}
    `

    document.querySelectorAll("[data-link]").forEach(link => {
      link.addEventListener("click", e => {
        e.preventDefault()
        window.history.pushState(null, "", link.getAttribute("href"))
        renderApp()
      })
    })

    const toggle = document.querySelector(".menu-toggle")
    const nav = document.querySelector(".nav")
    if (toggle && nav) {
      toggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("active")
        toggle.setAttribute("aria-expanded", String(isOpen))
        toggle.textContent = isOpen ? "×" : "≡"
      })

      nav.querySelectorAll("a[data-link]").forEach(a => {
        a.addEventListener("click", () => {
          nav.classList.remove("active")
          toggle.setAttribute("aria-expanded", "false")
          toggle.textContent = "≡"
        })
      })
    }
  } catch (error) {
    console.error("Erro ao renderizar o app:", error)
    renderErrorState(error)
  }
}

window.addEventListener("popstate", renderApp)
renderApp()
