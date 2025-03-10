import React, { useState, useEffect } from "react"
import { MoonIcon, SunIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { useRouter } from "next/router"
import Link from "next/link"

export const TopBar = () => {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  
  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen]);
  
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
          <Link href="/">
            <div className="flex items-center gap-2 group">
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
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/"
            >
              <span className={`text-sm cursor-pointer font-medium transition-colors hover:text-primary ${
                router.pathname === "/" ? "text-primary" : "text-muted-foreground"
              }`}>
                Build
              </span>
            </Link>
            <Link 
              href="/smart-contracts" 
              className="cursor-pointer" 
            >
              <span className={`text-sm cursor-pointer font-medium transition-colors hover:text-primary ${
                router.pathname === "/smart-contracts" ? "text-primary" : "text-muted-foreground"
              }`}>
                Smart Contracts
              </span>
            </Link>
            <Link 
              href="/docs" 
              className="cursor-pointer" 
            >
              <span className={`text-sm cursor-pointer font-medium transition-colors hover:text-primary ${
                router.pathname === "/docs" ? "text-primary" : "text-muted-foreground"
              }`}>
                Learn
              </span>
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
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <HamburgerMenuIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Mobile Menu - Fixed version */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden" style={{height: '100vh'}}>
          {/* Full-screen menu with solid background */}
          <div className="absolute inset-0 w-full h-full bg-background flex flex-col overflow-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <img 
                  src="/images/cryptominr-logo.png" 
                  alt="CryptoMinr Logo" 
                  width={28} 
                  className="logo-img" 
                />
                <span className="text-lg font-semibold text-foreground">
                  CryptoMinr<span className="text-blue-500">.nft</span>
                </span>
              </div>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full hover:bg-secondary/50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="flex-1 p-6">
              <nav className="space-y-6">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">Navigation</p>
                
                <Link 
                  href="/" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    router.pathname === "/" 
                      ? "bg-primary/10 text-primary border-l-4 border-primary" 
                      : "text-foreground hover:bg-secondary/20"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span className="font-medium text-lg">Home</span>
                  </div>
                </Link>
                
                <Link 
                  href="/smart-contracts" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    router.pathname === "/smart-contracts" 
                      ? "bg-primary/10 text-primary border-l-4 border-primary" 
                      : "text-foreground hover:bg-secondary/20"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41L13.42 20.58C13.2343 20.766 13.0137 20.9135 12.7709 21.0141C12.5281 21.1148 12.2678 21.1666 12.005 21.1666C11.7422 21.1666 11.4819 21.1148 11.2391 21.0141C10.9963 20.9135 10.7757 20.766 10.59 20.58L2 12V2H12L20.59 10.59C20.9625 10.9647 21.1716 11.4716 21.1716 12C21.1716 12.5284 20.9625 13.0353 20.59 13.41Z"></path>
                      <path d="M7 7H7.01"></path>
                    </svg>
                    <span className="font-medium text-lg">Smart Contracts</span>
                  </div>
                </Link>
                
                <Link 
                  href="/docs" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className={`flex items-center gap-3 p-4 rounded-lg ${
                    router.pathname === "/docs" 
                      ? "bg-primary/10 text-primary border-l-4 border-primary" 
                      : "text-foreground hover:bg-secondary/20"
                  }`}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20"></path>
                      <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z"></path>
                    </svg>
                    <span className="font-medium text-lg">Documentation</span>
                  </div>
                </Link>
              </nav>
            </div>
            
            {/* Theme Switcher */}
            <div className="border-t p-6 bg-card">
              <button
                className="flex items-center justify-between w-full p-4 rounded-lg bg-secondary/20 hover:bg-secondary/30"
                onClick={() => {
                  toggleTheme();
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="h-6 w-6 text-yellow-400" />
                      <span className="font-medium text-lg">Switch to Light Mode</span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="h-6 w-6 text-blue-400" />
                      <span className="font-medium text-lg">Switch to Dark Mode</span>
                    </>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
