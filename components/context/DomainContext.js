import { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from "react"
import { DomainApp } from "../../domain/index"
import { useRouter } from "next/router"
import { debugLogger } from "../../utils"

const DomainContext = createContext()

function DomainProvider({ children }) {
  const domainAppRef = useRef(null)
  const [blocks, setBlocks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  const initDomainApp = useCallback(() => {
    if (!domainAppRef.current) {
      try {
        domainAppRef.current = DomainApp.create()
        debugLogger("Domain App Initialized", domainAppRef.current)
      } catch (initError) {
        debugLogger("Failed to initialize Domain App", initError)
        setError(initError)
      }
    }
    return domainAppRef.current
  }, [])

  const fetchBlocks = useCallback(async () => {
    debugLogger("Starting block fetch process")

    try {
      const domainApp = initDomainApp()
      if (!domainApp || !domainApp.getBlocksUseCase) {
        throw new Error("Invalid domain app or missing getBlocksUseCase")
      }

      debugLogger("Executing getBlocksUseCase")
      const fetchedBlocks = await domainApp.getBlocksUseCase.execute()
      debugLogger("Fetch result:", fetchedBlocks)

      if (!fetchedBlocks) {
        debugLogger("No blocks returned")
        setBlocks([])
        return []
      }

      const validBlocks = Array.isArray(fetchedBlocks) ? fetchedBlocks : []
      debugLogger("Validated blocks:", validBlocks)
      setBlocks(validBlocks)
      return validBlocks
    } catch (fetchError) {
      debugLogger("Block fetch error", fetchError)
      setError(fetchError)
      setBlocks([])
      return []
    } finally {
      setIsLoading(false)
    }
  }, [initDomainApp])

  useEffect(() => {
    debugLogger("Domain Provider Effect Triggered")
    let isMounted = true
    const loadBlocks = async () => {
      if (isMounted) {
        debugLogger("Attempting to load blocks")
        await fetchBlocks()
      }
    }

    loadBlocks()
    return () => {
      isMounted = false
    }
  }, [fetchBlocks])

  const contextValue = useMemo(
    () => ({
      domain: initDomainApp(),
      updateBlocks: fetchBlocks,
      blocks,
      isLoading,
      error,
    }),
    [initDomainApp, fetchBlocks, blocks, isLoading, error],
  )

  return <DomainContext.Provider value={contextValue}>{children}</DomainContext.Provider>
}

function useDomain() {
  const context = useContext(DomainContext)

  if (context === undefined) {
    debugLogger("useDomain called outside of provider")
    throw new Error(`useDomain must be used within a DomainProvider`)
  }

  debugLogger("Domain Context Used", context)
  return context
}

export { DomainProvider, useDomain }
