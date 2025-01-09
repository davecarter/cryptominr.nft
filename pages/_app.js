import { useEffect } from "react"
import { Providers } from "components/context"
import globalStyles from "../styles/Globals.module.css"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    document.body.classList.add(globalStyles.globalReset)
    document.documentElement.classList.add(globalStyles.globalResetAll)
  }, [])

  return (
    <Providers>
      <Component {...pageProps} />
      <div id="react-modal-portal" />
    </Providers>
  )
}

export default MyApp
