import { renderHome } from "./pages/home"
import { renderTresTentos } from "./pages/tres_tentos"
import { renderSoja } from "./pages/soja"
import { renderMilho } from "./pages/milho"
import { renderFarelo } from "./pages/farelo"
import { renderInsumos } from "./pages/insumos"
import { renderTrigo } from "./pages/trigo"
import { renderPorto } from "./pages/porto"
import { renderCaramuru } from "./pages/caramuru"

export async function router() {
  const path = window.location.pathname

  switch (path) {
    case "/3tentos":
      return renderTresTentos()
    case "/soja":
      return renderSoja()
    case "/milho":
      return renderMilho()
    case "/trigo":
      return renderTrigo()
    case "/farelo":
      return renderFarelo()
    case "/insumos":
      return renderInsumos()
    case "/porto":
      return renderPorto()
    case "/caramuru":
      return renderCaramuru()
    default:
      return renderHome()
  }
}
