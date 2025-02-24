export const getElapsedTime = (date) => {
  const startDate = new Date(date)
  const endDate = new Date()
  const elapsedTime = Math.floor((endDate - startDate) / 1000)

  const hours = Math.floor(elapsedTime / 3600)
  const minutes = Math.floor((elapsedTime % 3600) / 60)
  const seconds = elapsedTime % 60

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
}
