import { useEffect } from "react"
import { Providers } from "components/context"
import "../styles/globals.css"

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Check for user's saved theme preference
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'light') {
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    } else if (savedTheme === 'dark') {
      document.documentElement.classList.remove("light")
      document.documentElement.classList.add("dark")
    } else {
      // Apply dark mode by default if no preference is saved
      if (!document.documentElement.classList.contains("light")) {
        document.documentElement.classList.add("dark")
      }
    }

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      const systemPrefersDark = e.matches
      const currentTheme = document.documentElement.classList.contains("light") ? "light" : "dark"
      
      // Only apply system preference if user hasn't manually chosen
      if (localStorage.getItem('theme') === null) {
        if (systemPrefersDark && currentTheme !== "dark") {
          document.documentElement.classList.remove("light")
          document.documentElement.classList.add("dark")
        } else if (!systemPrefersDark && currentTheme !== "light") {
          document.documentElement.classList.remove("dark")
          document.documentElement.classList.add("light")
        }
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <Providers>
      <Component {...pageProps} />
      <div id="react-modal-portal" />
    </Providers>
  )
}

export default MyApp
