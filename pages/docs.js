import { Header } from "components/Header"
import styles from "../styles/Docs.module.css"
import { Footer } from "components/Footer"
import { TopBar } from "components/TopBar"
import { useRouter } from "next/router"
import { Sidebar } from "components/Sidebar"

export default function Docs() {
  const router = useRouter()

  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <Sidebar />
        <div className={styles.content}>
          <section className={styles.conceptSection}>
            <h2 className={styles.sectionTitle}>Blockchain Fundamentals</h2>
            <div className={styles.conceptGrid}>
              <div className={styles.conceptCard}>
                <h2 id="what-problem-solves-a-blockchain">What problem solves a Blockchain?</h2>
                <div>
                  <p className={styles.conceptText}>
                    Sending digital information across the internet is easy. Every time we share a picture, we're
                    actually sending a copy of the original file. But what happens when we need to transfer value?
                    Unlike a picture, value shouldn't be duplicated—we want to send it only once while ensuring it isn't
                    copied or spent more than once. This challenge is known as the
                    <strong> double-spending problem</strong>. Blockchain addresses this issue by creating a transparent
                    and immutable digital ledger that ensures secure and verifiable transactions.
                  </p>
                  <p className={styles.conceptText}>
                    A blockchain is a <strong>decentralized</strong>, distributed ledger that records transactions
                    across a network of computers. Each transaction is grouped into a block, which is cryptographically
                    linked to the previous block, forming a chain. This structure ensures that once a block is added to
                    the chain, it cannot be altered without changing all subsequent blocks, making the data
                    tamper-proof.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.conceptGrid}>
              <div className={styles.conceptCard}>
                <h2 id="cryptographically-protected">Cryptographically protected</h2>
                <div>
                  <p className={styles.conceptText}>
                    Value is stored safely using cryptography without any other third party entity being involved in the
                    process. Imagine that you want to send a message to a friend safely without anyone being able to get
                    its contents if the message is intercepted. You can encrypt the message using a secret key, and only
                    your friend can decrypt it using the same key. This is how blockchain works, but on a much larger
                    scale because we are sending value across a network of computers of unknown entities so we need to
                    ensure that the value is safe and secure.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.conceptGrid}>
              <div className={styles.conceptCard}>
                <h2 id="hashing-functions">Hashing functions</h2>
                <div>
                  <p className={styles.conceptText}>
                    Hashing data allows cypher any data of any size into a fixed-size string of characters. This is
                    useful because it allows us to store data in a more efficient way and to ensure that the data has
                    not been tampered with. If the data is changed, the hash will change as well. This is how blockchain
                    ensures that the data is secure and has not been tampered with.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.callToActionSection}>
            <h2>Ready to try it by yourself?</h2>
            <p>
              Start exploring, creating blocks, and understanding the revolutionary technology that's changing the
              digital landscape.
            </p>
            <button onClick={() => router.push("/")} className={styles.startButton}>
              Build your Blockchain
            </button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
