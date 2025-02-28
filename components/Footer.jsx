import { footer, footerDocs, footerMeta } from "../styles/Footer.module.css"

export const Footer = () => {
  let isDocs = false
  if (typeof window !== "undefined") {
    isDocs = window.location.pathname.includes("docs")
  }

  return (
    <footer className={isDocs ? footerDocs : footer}>
      <a href="https://github.com/davecarter/cryptominr.nft" target="_blank" rel="noopener noreferrer">
        by David Garcia - 2025
      </a>
      <span className={footerMeta}>
        <span> | </span>
      </span>
      <span className={footerMeta}>
        <small>
          <a href="http://www.freepik.com">Images by Freepik</a>
        </small>
      </span>
    </footer>
  )
}
