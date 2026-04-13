import "./style.css"
import { renderHeader } from "./components/header"
import { router } from "./router"
import { renderFooter } from "./components/footer"

async function renderApp() {
  const header = await renderHeader()
  const page = await router()
  const footer = renderFooter() // não precisa await

  document.querySelector("#app").innerHTML = `
    ${header}
    <div class="content">
      ${page}
    </div>
    ${footer}
  `

  // Navegação SPA
  document.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      window.history.pushState(null, "", link.getAttribute("href"))
      renderApp()
    })
  })

  // Menu hambúrguer (mobile)
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
}

window.addEventListener("popstate", renderApp)
renderApp()
