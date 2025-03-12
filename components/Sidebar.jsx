import { useState, useEffect, useRef } from "react"
import { HamburgerMenuIcon, Cross1Icon } from "@radix-ui/react-icons"
import { cn } from "../lib/utils"

export const Sidebar = () => {
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // Array of all section IDs
  const sectionIds = [
    "what-problem-solves-a-blockchain",
    "decentralized-execution",
    "cryptographically-protected",
    "hashing-functions"
  ]
  
  const sectionLabels = {
    "what-problem-solves-a-blockchain": "What problem solves a Blockchain?",
    "decentralized-execution": "Decentralized execution",
    "cryptographically-protected": "Cryptographically protected",
    "hashing-functions": "Hashing functions"
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (element) observer.unobserve(element)
      })
    }
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })
      setActiveSection(id)
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <aside className="w-full lg:w-64 relative">
      <div className="flex items-center justify-between py-3 lg:hidden">
        <h3 className="text-lg font-medium text-foreground">Navigation</h3>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md hover:bg-secondary/80 text-foreground"
          aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isMobileMenuOpen ? <Cross1Icon className="h-5 w-5" /> : <HamburgerMenuIcon className="h-5 w-5" />}
        </button>
      </div>
      
      <nav className={`lg:block ${isMobileMenuOpen ? 'block' : 'hidden'} mt-2 lg:mt-0`}>
        <div className="sticky top-20 overflow-y-auto max-h-[80vh] p-3 rounded-lg bg-secondary/10">
          <ul className="space-y-1">
            {sectionIds.map((id) => (
              <li key={id}>
                <button
                  onClick={() => scrollToSection(id)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                    activeSection === id
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {sectionLabels[id]}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </aside>
  )
}
