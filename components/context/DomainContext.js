import { createContext, useContext, useEffect, useState } from "react"
import { DomainApp } from "../../domain/index"
const DomainContext = createContext()

function DomainProvider(props) {
  const domainApp = DomainApp.create()
  const [blocks, setBlocks] = useState([]);

  const updateBlocks = async () => {
    const initialBlocks = await domainApp.getBlockUseCase.execute()
    setBlocks(initialBlocks);
  }

  const deleteAllBlocks = async () => {
    await domainApp.deleteAllBlocksUseCase.execute();
    setBlocks([]);
  };

  useEffect(() => {
    updateBlocks()
  }, [])

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
