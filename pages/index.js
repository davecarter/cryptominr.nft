import React, { useState, useEffect } from "react"
import { Header } from "components/Header"
import { Block } from "components/Block"
import { useDomain } from "components/context"
import { CURRENT_DIFFICULTY } from "domain/config"
import { TopBar } from "components/TopBar"
import { Footer } from "components/Footer"
import { debugLogger } from "utils"
import { Modal } from "components/Modal"
import { Performance } from "components/Performance"
import { useRouter } from "next/router"

export default function Home() {
  const { domain, blocks, updateBlocks } = useDomain()
  const [localBlocks, setLocalBlocks] = useState(blocks)
  const [currentBlock, setCurrentBlock] = useState({ currentHash: "0" })
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { deleteAllBlocks } = useDomain()
  const router = useRouter()

  useEffect(() => {
    domain.getLastBlockHashUseCase.execute().then((lastBlock) => {
      debugLogger("Last block hash:", lastBlock)
      setCurrentBlock(lastBlock)
    })
  }, [localBlocks])

  useEffect(() => {
    if (!loading) return
    setTimeout(async () => {
      setLoading(false)
      const initialBlocks = await domain.getBlocksUseCase.execute()
      setLocalBlocks(initialBlocks)
    }, 1)
    setLocalBlocks(blocks)
    debugLogger("Initial blocks:", blocks)
  }, [blocks, localBlocks, loading])

  const addBlock = async (updatedBlock) => {
    debugLogger("Adding new block:", updatedBlock)
    try {
      const newBlock = {
        id: currentBlock?.id + 1 || 100,
        title: updatedBlock.title,
        blockData: updatedBlock.blockData,
        date: updatedBlock.date,
        previousHash: currentBlock?.currentHash || "GENESIS BLOCK",
        currentHash: updatedBlock.currentHash,
        nonce: updatedBlock.nonce,
        elapsedTime: updatedBlock.elapsedTime,
        difficulty: updatedBlock.difficulty,
      }

      debugLogger("Prepared new block:", newBlock)
      await domain.addNewBlockUseCase.execute({ block: newBlock })
      debugLogger("Block added successfully")

      setLocalBlocks((prevBlocks) => [...prevBlocks, newBlock])
      await updateBlocks()
    } catch (error) {
      console.error("Error adding block:", error)
    }
  }

  useEffect(() => {
    debugLogger("Block Addition Debug:", {
      localBlocksCount: localBlocks.length,
      lastBlock: localBlocks[localBlocks.length - 1],
    })
  }, [localBlocks])

  const handleDeleteClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    setIsModalOpen(false)
    await deleteAllBlocks()
  }

  const hasMinedBlocks = localBlocks.length > 0

  return (
    <div className="mt-4 md:mt-1 flex flex-col min-h-screen bg-background overflow-hidden">
      <Header />
      <TopBar />
      <div className="bg-gradient-to-b from-secondary to-background pb-12 pt-16 md:pb-16 md:pt-24 mt-4">
        <div className="container mx-auto px-4 max-w-4xl">
          <section className="flex flex-col items-center text-center">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-tight mb-6">
              Your gateway to understanding <span className="gradient-heading">Blockchain technology</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience blockchain in action with our interactive mining simulator
            </p>
          </section>
        </div>
      </div>

      <main className="flex-1 mx-auto px-4 max-w-4xl w-full py-8">
        <div className="my-8">
          <Performance />
        </div>

        {/* Blockchain Timeline Section */}
        <section className="my-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
                  <line x1="3" x2="21" y1="9" y2="9"></line>
                  <path d="m9 16 3-3 3 3"></path>
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Blockchain</h2>
            </div>
          </div>

          {/* Mining Block at the beginning of the timeline */}
          <div className="relative mb-16 z-10">
            <div className="shadcn-card border-2 border-primary/30 shadow-lg">
              <div className="shadcn-card-header bg-primary/5 border-b border-primary/10">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">Create a New Block</h3>
                <p className="text-sm md:text-base text-muted-foreground">Add your own block to the blockchain</p>
              </div>
              <div className="shadcn-card-content">
                <Block
                  difficulty={CURRENT_DIFFICULTY}
                  isEditMode={true}
                  previousHash={currentBlock ? currentBlock.currentHash : "GENESIS BLOCK"}
                  onSave={(updatedBlock) => addBlock(updatedBlock)}
                />
              </div>
            </div>
            
            {/* Timeline connector from mining block */}
            {localBlocks.length > 0 && (
              <div className="absolute left-1/2 -ml-1 bottom-[-3rem] w-2 h-12">
                <div className="absolute left-0 top-0 w-0.5 h-full bg-primary/40 left-1/2 transform -translate-x-1/2"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-primary bg-background"></div>
              </div>
            )}
          </div>

          {/* Timeline of blocks */}
          {localBlocks.length > 0 && (
            <div className="relative mx-auto">
              {localBlocks
                .slice()
                .sort((a, b) => b.id - a.id)
                .map((block, index, arr) => (
                  <div key={block.id} className="relative mb-16 last:mb-0 bg-[#000080]">
                    {/* Timeline connector */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-12 w-0.5 h-12 bg-primary/40"></div>
                    
                    {/* Block number indicator */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-primary shadow-md flex items-center justify-center text-white text-sm font-bold z-10">
                      {index + 1}
                    </div>
                    
                    {/* Card container with animation */}
                    <div 
                      className="relative z-[5] shadow-xl rounded-xl border-2 border-primary/30 bg-card overflow-hidden"
                      style={{ 
                        animationDelay: `${index * 0.15}s`,
                        opacity: 0,
                        animation: 'fadeIn 0.7s forwards'
                      }}
                    >
                      <style jsx>{`
                        @keyframes fadeIn {
                          from { opacity: 0; transform: translateY(20px); }
                          to { opacity: 1; transform: translateY(0); }
                        }
                      `}</style>
                      
                      {/* Hash connection indicator */}
                      <div className="absolute -top-px left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                      
                      <div className="p-5">
                        <Block blockKey={block.id} {...block} />
                      </div>
                    </div>
                    
                    {/* Bottom connector (except for last item) */}
                    {index < arr.length - 1 && (
                      <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 w-0.5 h-12 bg-primary/40">
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-primary/60 bg-background"></div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
          
          {/* Empty state for no blocks */}
          {localBlocks.length === 0 && (
            <div className="shadcn-card text-center p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold">No blocks mined yet</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Start by creating your first block above. Once mined, it will appear here in the blockchain.
                </p>
              </div>
            </div>
          )}
          {hasMinedBlocks && (
            <button 
              className="shadcn-button shadcn-button-destructive px-4 py-2 mt-4 w-full md:w-auto flex items-center gap-2 group" 
              onClick={handleDeleteClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:animate-shake">
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
              Delete All Blocks
            </button>
          )}
        </section>
      </main>

      <Footer />
      {isModalOpen && <Modal onClose={handleModalClose} onConfirm={handleConfirmDelete} />}
    </div>
  )
}
