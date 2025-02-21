import styles from "../styles/Footer.module.css"

export const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://github.com/davecarter/cryptominr.nft" target="_blank" rel="noopener noreferrer">
      Created by David Garcia - 2024
    </a>
    <span className={styles.footerMeta}>
      <span> | </span>
    </span>
    <span className={styles.footerMeta}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        Powered by Vercel
      </a>
      <small>
        <a href="http://www.freepik.com">Images by Freepik</a>
      </small>
    </span>
  </footer>
)
