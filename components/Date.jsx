import { dateContainer, timeLabel, timeInput, dateLabel, dateInput } from "../styles/DateComponent.module.css"

export const DateComponent = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  return (
    <div className={dateContainer}>
      <span className={timeLabel}>Time:</span>
      <span className={timeInput}>
        {hours}:{minutes}
      </span>
      <span className={dateLabel}>Date:</span>
      <span className={dateInput}>
        {year}-{month}-{day}
      </span>
    </div>
  )
}
