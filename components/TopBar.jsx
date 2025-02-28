import {
  active,
  container,
  logo,
  cta,
  buttons,
  mobileButtons,
  logoHeading,
  logoContainer,
} from "../styles/TopBar.module.css"
import React from "react"
import { Modal } from "./Modal"
import { useRouter } from "next/router"

export const TopBar = () => {
  const router = useRouter()
  const { pathname } = router

  return (
    <>
      <nav className={container}>
        <div className={logo}>
          <img src="/images/cryptominr-logo.png" alt="CryptoMinr Logo" width={50} />
          <div className={logoContainer}>
            <h1 className={logoHeading}>CryptoMinr.nft</h1>
            <h3>A simple blockchain simulation tool</h3>
          </div>
        </div>
        <div className={buttons}>
          <button className={`${cta} ${pathname === "/" ? active : ""}`} onClick={() => router.push("/")}>
            Build
          </button>
          <button className={`${cta} ${pathname === "/docs" ? active : ""}`} onClick={() => router.push("/docs")}>
            Learn
          </button>
        </div>
        <div className={mobileButtons}>
          <button className={`${cta} ${pathname === "/" ? active : ""}`} onClick={() => router.push("/")}>
            Build
          </button>
          <button className={`${cta} ${pathname === "/docs" ? active : ""}`} onClick={() => router.push("/docs")}>
            Doc
          </button>
        </div>
      </nav>
    </>
  )
}
