import { useState, useEffect, useRef } from "react"
import { getCalculatedHashService } from "domain/blockchain/service"
import { useDomain } from "components/context"
import { getCurrentDateInSpanishFormat, formatNumeral, getElapsedTime } from "utils"
import { DateComponent } from "./Date"
import { cn } from "../lib/utils"
import { MiningExplanationModal } from "./MiningExplanationModal"

export const Block = ({
  id,
  title,
  blockData,
  date,
  elapsedTime,
  previousHash,
  currentHash,
  nonce,
  difficulty,
  isEditMode,
  onSave,
}) => {
  const { domain } = useDomain()

  const [editableTitle, setEditableTitle] = useState(title || "")
  const [editableBlockData, setEditableBlockData] = useState(blockData || "")
  const [editableDate, setEditableDate] = useState(date || getCurrentDateInSpanishFormat())
  const [editableCurrentHash, setEditableCurrentHash] = useState(currentHash || "")
  const [editableNonce] = useState(nonce || 0)
  const [editableDifficulty, setEditableDifficulty] = useState(difficulty || 1)
  const [mining, setMining] = useState(false)
  const [miningNonce, setMiningNonce] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [hashChanged, setHashChanged] = useState(false)
  const [prevHashHighlighted, setPrevHashHighlighted] = useState(false)

  const nonceRef = useRef(miningNonce)
  const initialTimeRef = useRef(new Date())
  const previousHashRef = useRef(previousHash)
  const hashChangeTimeoutRef = useRef(null)
  const prevHashTimeoutRef = useRef(null)

  useEffect(() => {
    const updateNonce = () => {
      if (window.nonce !== undefined) {
        setMiningNonce(window.nonce)
        nonceRef.current = window.nonce
      }
    }

    const interval = setInterval(updateNonce, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setEditableDate(getCurrentDateInSpanishFormat())
    const updateHash = async () => {
      const dataToHash = `${editableTitle}${editableBlockData}${getCurrentDateInSpanishFormat()}${previousHash}${editableNonce}${editableDifficulty}`
      const newHash = await getCalculatedHashService({ data: dataToHash })
      
      // If the hash has changed, show the visual indicator
      if (newHash !== editableCurrentHash) {
        setHashChanged(true)
        // Clear any existing timeout
        if (hashChangeTimeoutRef.current) clearTimeout(hashChangeTimeoutRef.current)
        // Set a new timeout to remove the highlight after 1.5 seconds
        hashChangeTimeoutRef.current = setTimeout(() => {
          setHashChanged(false)
        }, 1500)
      }
      
      setEditableCurrentHash(newHash)
      
      // Highlight the previous hash to show its relevance
      setPrevHashHighlighted(true)
      if (prevHashTimeoutRef.current) clearTimeout(prevHashTimeoutRef.current)
      prevHashTimeoutRef.current = setTimeout(() => {
        setPrevHashHighlighted(false)
      }, 1500)
    }

    if (isEditMode) {
      updateHash()
    }
  }, [editableTitle, editableBlockData, editableDate, previousHash, editableNonce, editableDifficulty, isEditMode])

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (hashChangeTimeoutRef.current) clearTimeout(hashChangeTimeoutRef.current)
      if (prevHashTimeoutRef.current) clearTimeout(prevHashTimeoutRef.current)
    }
  }, [])

  const handleCalculateHash = async () => {
    if (!onSave) return

    const blockData = {
      title: editableTitle,
      blockData: editableBlockData,
      date: editableDate,
      elapsedTime: initialTimeRef.current,
      previousHash: previousHash,
      difficulty: editableDifficulty,
    }

    try {
      const { validHash, nonce: validNonce } = await domain.getMinedBlockUseCase.execute({
        blockData,
        difficulty: editableDifficulty,
      })

      window.nonce = validNonce

      onSave({
        id,
        title: editableTitle,
        blockData: editableBlockData,
        date: editableDate,
        previousHash,
        elapsedTime: getElapsedTime(initialTimeRef.current),
        currentHash: validHash,
        nonce: formatNumeral(validNonce),
        difficulty: editableDifficulty,
      })
    } catch (error) {
      console.error("Error while calculating hash:", error)
      throw error
    }
  }

  const handleMining = async () => {
    initialTimeRef.current = new Date()
    setMining(true)

    try {
      await handleCalculateHash()
    } catch (error) {
      console.error("Error during mining:", error)
    } finally {
      setEditableTitle("")
      setEditableBlockData("Enter block data")
      setMining(false)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="relative w-full border rounded-lg p-6 shadow-sm bg-card text-card-foreground">
      <div className="mb-4 grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground mb-1">Current Hash:</span>
          <div className={cn(
            "block-hash text-md font-mono truncate transition-all duration-300",
            hashChanged && "bg-primary/20 text-primary font-semibold animate-pulse"
          )}>
            {!mining ? editableCurrentHash : window.hash}
          </div>
        </div>
        <div className="flex-shrink-0">
          <DateComponent />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {isEditMode ? "Current difficulty: " : "Mined difficulty: "}
          </span>
          {isEditMode ? (
            <select 
              value={editableDifficulty}
              onChange={(e) => setEditableDifficulty(parseInt(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              {[...Array(8)].map((_, i) => (
                <option key={i} value={(i + 1).toString()}>
                  0{i + 1}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-mono">{editableDifficulty}</span>
          )}
        </div>
        <div className={cn(
          "flex items-center space-x-2",
          mining && "text-primary"
        )}>
          <span className="text-sm text-muted-foreground">Block Nonce:</span>
          <span className="font-mono text-sm">
            {!mining ? editableNonce : miningNonce}
          </span>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        {isEditMode ? (
          <input
            disabled={mining}
            type="text"
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            onFocus={() => setEditableTitle("")}
            placeholder="Enter block title"
            className="border rounded px-2 py-1 max-w-[300px]"
          />
        ) : (
          <h2 className="text-xl font-bold truncate max-w-full">{title}</h2>
        )}
        {!isEditMode && (
          <div className="flex items-center space-x-2 flex-shrink-0">
            <span className="text-sm text-muted-foreground">Block ID</span>
            <span className="font-mono text-sm">{id}</span>
          </div>
        )}
      </div>

      <div className="mb-4">
        {isEditMode ? (
          <textarea
            disabled={mining}
            value={editableBlockData}
            onChange={(e) => setEditableBlockData(e.target.value)}
            onFocus={() => setEditableBlockData("")}
            placeholder="Enter block data"
            onBlur={() => setEditableBlockData(editableBlockData || "Enter block data")}
            className="w-full border rounded px-3 py-2 min-h-[100px]"
          />
        ) : (
          <div className="block-code bg-muted rounded-md">
            {blockData}
          </div>
        )}
      </div>

      {!isEditMode && (
        <div className="mb-4 flex flex-col text-sm text-muted-foreground">
          <span>Mining time:</span>
          <span className="font-mono">{elapsedTime}</span>
        </div>
      )}

      {isEditMode && (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex w-full items-center justify-center gap-2 mb-2">
            <button
              onClick={openModal}
              className="inline-flex items-center px-3 py-1 text-xs rounded-full border border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
            >
              <svg className="mr-1 h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              Learn How Mining Works
            </button>
          </div>
          
          {mining && (
            <div className="flex flex-col items-center">
              <span className="text-sm text-primary mb-2">Mining in progress...</span>
              <div className="w-full bg-secondary/20 rounded-full h-2.5 mb-2">
                <div className="bg-primary h-2.5 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground">Testing nonce: {miningNonce}</span>
            </div>
          )}
          
          <button
            onClick={handleMining}
            disabled={mining}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-md text-sm font-medium w-full max-w-xs"
          >
            {!mining ? "Mine Block!" : "Mining..."}
          </button>
        </div>
      )}

      {/* Connection visualization when in edit mode */}
      {isEditMode && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center mb-2">
            <div className="w-5 h-5 mr-2 rounded-full bg-primary/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
            </div>
            <span className="text-sm font-medium text-foreground">Blockchain Connection</span>
          </div>
          <div className="flex flex-col space-y-2 pl-7">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Previous Block Hash:</span>
              <span className={cn(
                "text-xs font-mono truncate",
                prevHashHighlighted && "bg-primary/20 text-primary font-semibold animate-pulse"
              )}>
                {previousHash}
              </span>
            </div>
            <div className="h-6 flex items-center pl-4">
              <div className={cn(
                "h-full w-0.5 bg-primary/30",
                prevHashHighlighted && "animate-pulse bg-primary"
              )}></div>
              <div className={cn(
                "h-0.5 w-4 bg-primary/30 ml-0",
                prevHashHighlighted && "animate-pulse bg-primary"
              )}></div>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={cn(
                  "text-primary/50",
                  prevHashHighlighted && "text-primary animate-pulse"
                )}
              >
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">Current Hash (changes with your data):</span>
              <span className={cn(
                "text-xs font-mono truncate",
                hashChanged && "text-primary font-semibold"
              )}>
                {editableCurrentHash}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4">
        <span className="text-sm text-muted-foreground block mb-1">Previous Hash:</span>
        <span className={cn(
          "block-hash text-xs font-mono truncate block", 
          prevHashHighlighted && !isEditMode && "bg-primary/20 text-primary font-semibold"
        )}>
          {previousHash}
        </span>
      </div>
      
      {/* Modal for mining explanation */}
      <MiningExplanationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}
