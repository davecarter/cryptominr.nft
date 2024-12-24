import { createContext, useContext } from "react"
import { DomainApp } from "../../domain/index"
const DomainContext = createContext()

function DomainProvider(props) {
  const domainApp = DomainApp.create()

  return (
    <DomainContext.Provider
      value={{
        domain: domainApp,
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
