import { createContext, useContext, useState } from "react"
import { DomainApp } from "../../domain/index"
import { useRouter } from "next/router"
const DomainContext = createContext()

function DomainProvider(props) {
  const domainApp = DomainApp.create()
  const [blocks, setBlocks] = useState([]);
  const router = useRouter()

  const updateBlocks = async () => {
    const initialBlocks = await domainApp.getBlocksUseCase.execute()
    setBlocks(initialBlocks);
  }

  const deleteAllBlocks = async () => {
    const blocks = await domainApp.deleteAllBlocksUseCase.execute();
    router.reload();
  };

  return (
    <DomainContext.Provider
      value={{
        domain: domainApp,
        updateBlocks,
        deleteAllBlocks,
        blocks
      }}
      {...props}
    />
  )
}

function useDomain() {
  const context = useContext(DomainContext)
  if (context === undefined) {
    throw new Error(`useDomain must be used within a DomainProvider`)
  }
  return context
}

export { DomainProvider, useDomain }
