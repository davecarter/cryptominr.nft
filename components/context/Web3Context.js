import { useState, useEffect, createContext, useContext } from "react"
import { useDomain } from "components/context"

const Web3Context = createContext()

function Web3Provider(props) {
  const [injectedProvider, setInjectedProvider] = useState(null)
  const [injectedBlockNumber, setInjectedBlockNumber] = useState(null)
  const { domain } = useDomain()

  const updateInjectedProvider = () => {
    domain.getInjectedProviderUseCase
      .execute()
      .then((injectedProvider) => {
        injectedProvider && setInjectedProvider(injectedProvider)
      })
      .catch(() => setInjectedProvider(null))
  }

  // provider events
  useEffect(() => {
    if (!injectedProvider?.provider?.on) return

    const { provider } = injectedProvider

    const handleAccountChanged = (accounts) => {
      const account = accounts[0]
      account ? updateInjectedProvider() : disconnectWallet()
    }
    const handleChainChanged = () => {
      updateInjectedProvider()
    }

    provider.on("accountsChanged", handleAccountChanged)
    provider.on("chainChanged", handleChainChanged)
    provider.on("disconnect", disconnectWallet)

    return () => {
      if (provider?.removeListener) {
        provider.removeListener("accountsChanged", handleAccountChanged)
        provider.removeListener("chainChanged", handleChainChanged)
        provider.removeListener("disconnect", disconnectWallet)
      }
    }
  }, [injectedProvider?.provider])

  // Injected Block Number
  useEffect(() => {
    if (!injectedProvider?.library?.on || !injectedProvider?.isCorrectChain) return

    const { library } = injectedProvider
    const handleBlock = (blockNumber) => setInjectedBlockNumber(blockNumber)

    library.on("block", handleBlock)

    return () => {
      if (library?.removeListener) {
        library.removeListener("block", handleBlock)
      }
    }
  }, [injectedProvider?.library])

  const connectWallet = () => {
    domain.connectWalletUseCase
      .execute()
      .then((injectedProvider) => {
        injectedProvider && setInjectedProvider(injectedProvider)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  const disconnectWallet = () => {
    domain.disconnectWalletUseCase.execute().then(() => {
      setInjectedProvider(null)
      setInjectedBlockNumber(null)
    })
  }

  const handleSwitchChain = () => {
    domain.handleSwitchChainUseCase.execute({ provider: injectedProvider?.provider }).then(() => {
      updateInjectedProvider()
    })
  }

  const { provider, account, library, signer, selectedChain, isCorrectChain, hasWallet, isActive, isWalletConnected } =
    injectedProvider || {}

  return (
    <Web3Context.Provider
      value={{
        account,
        injectedBlockNumber,
        hasWallet,
        isActive,
        isCorrectChain,
        isWalletConnected,
        library,
        provider,
        selectedChain,
        signer,
        connectWallet,
        disconnectWallet,
        handleSwitchChain,
      }}
      {...props}
    />
  )
}

function useWeb3() {
  const context = useContext(Web3Context)
  if (context === undefined) {
    throw new Error(`useWeb3 must be used within a Web3Provider`)
  }
  return context
}

export { Web3Provider, useWeb3 }
