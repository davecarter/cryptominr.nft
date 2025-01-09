import { Header } from "components/Header"
import styles from "../styles/Docs.module.css"
import { Footer } from "components/Footer"
import { TopBar } from "components/TopBar"
import Image from "next/image"

export default function Docs() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <TopBar />
        <div className={styles.content}>
          <section className={styles.heroSection}>
            <h1 className={styles.mainTitle}>
              Blockchain Builder Tool: Your Gateway to Understanding Blockchain Technology
            </h1>
            <p className={styles.subtitle}>
              Explore the fundamentals of blockchain through an interactive, hands-on learning experience
            </p>
          </section>

          <section className={styles.conceptSection}>
            <h2 className={styles.sectionTitle}>Block Creation Fundamentals</h2>
            <div className={styles.conceptGrid}>
              <div className={styles.conceptCard}>
                <h3>What is a Block?</h3>
                <div>
                  A block is the fundamental unit of a blockchain, containing:
                  <ul className={styles.list}>
                    <li>Unique Title</li>
                    <li>Block Data</li>
                    <li>Timestamp</li>
                    <li>Previous Block's Hash</li>
                    <li>Current Block's Hash</li>
                    <li>Nonce</li>
                  </ul>
                </div>
              </div>
              <div className={styles.conceptCard}>
                <h3>Block Creation Process</h3>
                <div>
                  Mining a block involves several steps:
                  <ol className={styles.list}>
                    <li>Enter a descriptive title</li>
                    <li>Add meaningful block data</li>
                    <li>System generates timestamp</li>
                    <li>Calculate hash using input data</li>
                    <li>Apply mining process with nonce</li>
                  </ol>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.detailSection}>
            <h2 className={styles.sectionTitle}>Deep Dive: Block Components</h2>

            <div className={styles.detailCard}>
              <h3>Block Data: The Core of Information</h3>
              <div>
                Block data represents the payload of your blockchain entry. In our tool, you can input text that will be
                cryptographically processed to ensure:
                <ul>
                  <li>Immutability: Data cannot be altered without changing the entire chain</li>
                  <li>Transparency: All data is verifiable</li>
                  <li>Security: Cryptographic hashing prevents tampering</li>
                </ul>
              </div>
            </div>

            <div className={styles.detailCard}>
              <h3>Nonce: The Mining Mechanism</h3>
              <div>
                The nonce is a crucial component in blockchain's proof-of-work mechanism:
                <ul>
                  <li>Randomly generated number</li>
                  <li>Incremented until hash meets difficulty criteria</li>
                  <li>Ensures computational work is done to create a block</li>
                  <li>Prevents easy block generation</li>
                </ul>
                As difficulty increases, finding a valid hash becomes more computationally intensive.
              </div>
            </div>
          </section>

          <section className={styles.callToActionSection}>
            <h2>Ready to Build Your First Blockchain?</h2>
            <p>
              Start exploring, creating blocks, and understanding the revolutionary technology that's changing the
              digital landscape.
            </p>
            <button className={styles.startButton}>Begin Blockchain Journey</button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
