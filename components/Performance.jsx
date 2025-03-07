import { useState } from "react"
import { useDomain } from "./context"
import { formatNumeral } from "utils"
// Temporarily comment out these imports until we implement UI components
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const Performance = () => {
  const { domain } = useDomain()
  const [performance, setPerformance] = useState(0)
  const [loading, setLoading] = useState(false)
  const [countdown, setCountdown] = useState(null)

  const handlePerformance = async () => {
    if (loading) return
    setLoading(true)
    let timeLeft = 10
    setCountdown(timeLeft)

    const interval = setInterval(() => {
      timeLeft -= 1
      setCountdown(timeLeft)
      if (timeLeft <= 0) clearInterval(interval)
    }, 1000)

    await domain.getComputerPerformanceUseCase.execute().then(setPerformance)

    clearInterval(interval)
    setCountdown(null)
    setLoading(false)
  }

  return (
    <div className="shadcn-card">
      <div className="shadcn-card-header">
        <h3 className="text-lg font-semibold">System Performance</h3>
        <p className="text-sm text-muted-foreground">
          Measure your system's hashing capability for mining
        </p>
      </div>
      <div className="shadcn-card-content">
        <div className="flex flex-col gap-4">
          {performance > 0 && (
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <span className="text-3xl font-mono font-bold gradient-heading">
                  {formatNumeral(performance)}
                </span>
                <span className="text-xl ml-2 text-muted-foreground">hashes/sec</span>
              </div>
            </div>
          )}
          
          <button 
            onClick={handlePerformance}
            disabled={loading}
            className="shadcn-button shadcn-button-primary w-full py-2"
          >
            {loading ? `Calculating... ${countdown}s` : "Test Your System"}
          </button>
        </div>
      </div>
    </div>
  )
}
