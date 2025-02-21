import { useEffect, useState } from "react"
import {
  sidebar,
  sidebarContent,
  sidebarTitle,
  sidebarList,
  sidebarListItem,
  activeLink,
} from "../styles/Sidebar.module.css"

export const Sidebar = () => {
  const [active, setActive] = useState("")
  useEffect(() => {
    const anchors = document.querySelectorAll("aside > div > ul > li > a")

    anchors.forEach((anchor) =>
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          setActive(target.id)
          const offset = 120
          const targetPosition = target.offsetTop - offset

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      }),
    )

    return () => anchors.forEach((anchor) => anchor.removeEventListener("click", () => {}))
  }, [])

  return (
    <aside className={sidebar}>
      <div className={sidebarContent}>
        <h2 className={sidebarTitle}>Table of Contents</h2>
        <ul className={sidebarList}>
          <li className={sidebarListItem}>
            <a
              href="#what-problem-solves-a-blockchain"
              className={active === "what-problem-solves-a-blockchain" ? activeLink : ""}
            >
              What problem solves a Blockchain?
            </a>
          </li>
          <li className={sidebarListItem}>
            <a
              href="#cryptographically-protected"
              className={active === "cryptographically-protected" ? activeLink : ""}
            >
              Cryptographically protected
            </a>
          </li>
          <li className={sidebarListItem}>
            <a href="#hashing-functions" className={active === "hashing-functions" ? activeLink : ""}>
              Hashing functions
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}
