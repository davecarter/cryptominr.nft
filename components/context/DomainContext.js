import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { DomainApp } from "../../domain/index"
import { useRouter } from "next/router"
import { debugLogger } from "../../utils"

const DomainContext = createContext()

function DomainProvider(props) {
  const domainApp = useMemo(() => DomainApp.create(), [])

  const [blocks, setBlocks] = useState([])
  const router = useRouter()

  const updateBlocks = async () => {
    const initialBlocks = await domainApp.getBlocksUseCase.execute()
    setBlocks(initialBlocks)
    return initialBlocks
  }

  const deleteAllBlocks = async () => {
    const blocks = await domainApp.deleteAllBlocksUseCase.execute()
    router.reload()
  }

  return (
    <DomainContext.Provider
      value={{
        domain: domainApp,
        updateBlocks,
        deleteAllBlocks,
        setBlocks,
        blocks,
      }}
      {...props}
    />
  )
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
