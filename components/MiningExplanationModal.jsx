import React, { useEffect } from 'react';

export const MiningExplanationModal = ({ isOpen, onClose }) => {
  // Handle escape key and prevent background scrolling
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative bg-card z-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-lg border border-border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold gradient-heading">How Blockchain Mining Works</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* Mining Process Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-primary">The Mining Process</h3>
          <ol className="list-decimal pl-5 space-y-3 text-foreground">
            <li>
              <strong>Enter Block Data:</strong> When you create a new block, you provide a title and content that will be permanently stored in this block.
            </li>
            <li>
              <strong>Set Difficulty Level:</strong> You choose a difficulty level (1-8), which determines how many leading zeros the block's hash must have. Higher difficulty makes mining more challenging but creates a more secure block.
            </li>
            <li>
              <strong>Finding the Correct Hash:</strong> The mining process tests different numbers (called a "nonce") until it finds one that, when combined with your block data, produces a hash with the required number of leading zeros.
            </li>
            <li>
              <strong>Computational Work:</strong> Your browser may test thousands or millions of different nonce values before finding a valid one. This computational work is what makes blockchain secure.
            </li>
            <li>
              <strong>Validation:</strong> Once a valid hash is found, the block is considered "mined" and can be added to the blockchain with a timestamp and its final hash value.
            </li>
          </ol>
        </div>
        
        {/* Blockchain Security Features */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary">Blockchain Security Features</h3>
          <div className="space-y-3 text-foreground">
            <div className="p-3 bg-muted/40 rounded-md">
              <strong className="text-primary">Immutability:</strong> 
              <p>Each block contains a reference to the previous block's hash. If any data in a previous block is altered, all subsequent hashes would become invalid, making tampering evident.</p>
            </div>
            
            <div className="p-3 bg-muted/40 rounded-md">
              <strong className="text-primary">Proof of Work:</strong>
              <p>The computational effort required to find a valid hash serves as proof that work was done, making it resource-intensive to manipulate the blockchain.</p>
            </div>
            
            <div className="p-3 bg-muted/40 rounded-md">
              <strong className="text-primary">Decentralization:</strong>
              <p>In real blockchain networks, mining is performed by multiple participants, and consensus is required to add new blocks, preventing single-point manipulation.</p>
            </div>
            
            <div className="p-3 bg-muted/40 rounded-md">
              <strong className="text-primary">Transparency:</strong>
              <p>All transactions and blocks are visible to everyone on the network, creating a transparent and verifiable record.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 