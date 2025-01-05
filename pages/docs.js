import { Header } from "components/Header"
import styles from "../styles/Docs.module.css"
import { Footer } from "components/Footer"
import { TopBar } from "components/TopBar"

export default function Docs() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <div className={styles.content}>
          <h1>Docs</h1>
          <p>
            This is the docs page.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}
