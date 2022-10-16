import { Web3Provider, DomainProvider } from "./index"

export const Providers = ({ children }) => {
  return (
    <DomainProvider>
      <Web3Provider>{children}</Web3Provider>
    </DomainProvider>
  )
}
