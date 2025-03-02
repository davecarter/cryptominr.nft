import { useState } from "react"
import { useDomain } from "./context"
import { formatNumeral } from "utils"
import { container, sectionPerformance, cta, ctaLoading, data } from "../styles/Performance.module.css"

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
    <div className={container}>
      <h2>PERFORMANCE</h2>
      <div className={sectionPerformance}>
        <button className={loading ? ctaLoading : cta} onClick={handlePerformance}>
          {loading ? `RESULT in ${countdown}s` : "TEST"}
        </button>
        <p className={data}>{formatNumeral(performance)} hashes/sec</p>
      </div>
    </div>
  )
}
