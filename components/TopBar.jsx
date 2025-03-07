import React, { useState, useEffect } from "react"
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/router"
import Link from "next/link"

export const TopBar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  
  useEffect(() => {
    // Check saved theme preference first
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      setTheme('light')
    } else if (savedTheme === 'dark') {
      setTheme('dark')
    } else {
      // Fall back to checking document class
      if (document.documentElement.classList.contains("light")) {
        setTheme("light")
      } else {
        setTheme("dark")
      }
    }
  }, [])
  
  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
      setTheme("light")
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.remove("light") 
      document.documentElement.classList.add("dark")
      setTheme("dark")
      localStorage.setItem('theme', 'dark')
    }
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="absolute from-primary/70 via-blue-500/70 to-primary/70 rounded-lg blur-sm opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative rounded-lg p-1.5">
                  <img 
                    src="/images/cryptominr-logo.png" 
                    alt="CryptoMinr Logo" 
                    width={32} 
                    className="logo-img group-hover:scale-110 transition-transform" 
                  />
                </div>
              </div>
              <span className={`text-xl font-semibold bg-clip-text text-transparent ${
                theme === 'dark' 
                ? 'bg-gradient-to-r from-white via-blue-400 to-white' 
                : 'bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600'
              }`}>
                CryptoMinr<span className="text-blue-500">.nft</span>
              </span>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                router.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/docs" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                router.pathname === "/docs" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Documentation
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring h-9 py-2 px-3 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            <SunIcon className={`h-4 w-4 transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0 scale-0'}`} />
            <MoonIcon className={`h-4 w-4 transition-all duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-0 scale-0'}`} />
            <span className="ml-2 text-xs md:text-sm">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>
          
          <button
            className="inline-flex items-center justify-center rounded-md text-sm font-medium h-9 py-2 px-3 bg-primary text-primary-foreground shadow hover:bg-primary/90 md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <HamburgerMenuIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Mobile navigation overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 md:hidden pt-16">
          <nav className="container py-6 px-4 flex flex-col space-y-4">
            <Link 
              href="/" 
              className={`text-lg font-medium px-4 py-3 rounded-md ${
                router.pathname === "/" ? "bg-secondary/50 text-primary" : "text-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/docs" 
              className={`text-lg font-medium px-4 py-3 rounded-md ${
                router.pathname === "/docs" ? "bg-secondary/50 text-primary" : "text-foreground"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Documentation
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
