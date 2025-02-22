import { footer, footerDocs, footerMeta } from "../styles/Footer.module.css"

export const Footer = () => {
  let isDocs = false
  if (typeof window !== "undefined") {
    isDocs = window.location.pathname.includes("docs")
  }

  return (
    <footer className={isDocs ? footerDocs : footer}>
      <a href="https://github.com/davecarter/cryptominr.nft" target="_blank" rel="noopener noreferrer">
        Created by David Garcia - 2024
      </a>
      <span className={footerMeta}>
        <span> | </span>
      </span>
      <span className={footerMeta}>
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
}
