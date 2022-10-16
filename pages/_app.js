import { Providers } from "components/context"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Providers>
        <Component {...pageProps} />
      </Providers>
      <div id="react-modal-portal" />
    </>
  )
}

export default MyApp
