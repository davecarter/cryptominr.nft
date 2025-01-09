const DebugConfig = {
  isEnabled() {
    if (typeof window === "undefined") return false
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("debugger") === "true"
  },
}

export const debugLogger = (...args) => {
  if (!DebugConfig.isEnabled()) {
    return
  }

  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}]`, ...args)
}

debugLogger.isEnabled = () => DebugConfig.isEnabled()
export const debugConfig = DebugConfig
