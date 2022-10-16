import { useWeb3 } from "components/context"
import { useState, useEffect } from "react"
import { addressNick, ensNameResolver, getExplorerLink } from "../domain/utils"

import styles from "../styles/TopBar.module.css"

export const TopBar = () => {
  const { account, isActive, isCorrectChain, connectWallet, isWalletConnected, disconnectWallet, handleSwitchChain } =
    useWeb3()
  const [ensName, setEnsName] = useState(null)

  useEffect(() => {
    ensNameResolver(account).then(setEnsName)
  }, [account])

  return (
    <nav className={styles.container}>
      <div>
        {!isActive && !isWalletConnected && (
          <button className={styles.cta} onClick={connectWallet}>
            Connect Metamask
          </button>
        )}
        {isActive && isWalletConnected && (
          <button className={styles.cta} onClick={disconnectWallet}>
            Disconnect Metamask
          </button>
        )}
        {isWalletConnected && !isCorrectChain && (
          <button className={styles.cta} onClick={handleSwitchChain}>
            Switch to GOERLY Chain
          </button>
        )}
      </div>
      <div>
        {isActive && isWalletConnected && (
          <span>
            <span>user wallet: </span>
            <span className={styles.wallet}>{ensName || addressNick(account)}</span>
          </span>
        )}
      </div>
    </nav>
  )
}
