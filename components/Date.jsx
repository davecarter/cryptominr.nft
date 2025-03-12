// No CSS module imports needed - using Tailwind directly

export const DateComponent = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  
  return (
    <div className="flex items-center space-x-4 text-sm">
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground">Time:</span>
        <span className="font-mono">
          {hours}:{minutes}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-muted-foreground">Date:</span>
        <span className="font-mono">
          {year}-{month}-{day}
        </span>
      </div>
    </div>
  )
}
