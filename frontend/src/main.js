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

  document.querySelectorAll("[data-link]").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault()
      window.history.pushState(null, "", link.getAttribute("href"))
      renderApp()
    })
  })
}

window.addEventListener("popstate", renderApp)
renderApp()