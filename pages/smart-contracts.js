import React, { useState, useEffect } from "react"
import { Header } from "components/Header"
import { TopBar } from "components/TopBar"
import { Footer } from "components/Footer"

// Alert Component
const Alert = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  return (
    <div className={`fixed top-20 right-4 z-50 max-w-md animate-slide-in-right ${
      type === 'success' ? 'bg-green-500/90' : 
      type === 'info' ? 'bg-blue-500/90' : 
      type === 'warning' ? 'bg-yellow-500/90' : 'bg-red-500/90'
    } text-white p-4 rounded-md shadow-lg backdrop-blur-sm flex items-start gap-3`}>
      <div className="flex-shrink-0 pt-0.5">
        {type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        )}
        {type === 'info' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        )}
        {type === 'warning' && (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        )}
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button 
        onClick={onClose} 
        className="flex-shrink-0 text-white hover:text-white/80"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );
};

// Simple Smart Contract Voting System Component
const VotingSystem = () => {
  // Mock contract data
  const [candidates, setCandidates] = useState([
    { id: 1, name: "Candidate A", votes: 0 },
    { id: 2, name: "Candidate B", votes: 0 },
    { id: 3, name: "Candidate C", votes: 0 }
  ])
  const [hasVoted, setHasVoted] = useState(false)
  const [votingAddress, setVotingAddress] = useState("")
  const [transactionPending, setTransactionPending] = useState(false)
  const [transactionHistory, setTransactionHistory] = useState([])
  const [error, setError] = useState("")
  const [message, setMessage] = useState({ text: "", type: "" })

  // Solidity code with syntax highlighting
  const votingContractCode = `
<span class="sol-comment">// SPDX-License-Identifier: MIT</span>
<span class="sol-keyword">pragma solidity</span> <span class="sol-version">^0.8.0</span>;

<span class="sol-keyword">contract</span> <span class="sol-contract">VotingSystem</span> {
    <span class="sol-comment">// Struct to represent a candidate</span>
    <span class="sol-keyword">struct</span> <span class="sol-struct">Candidate</span> {
        <span class="sol-type">uint</span> <span class="sol-variable">id</span>;
        <span class="sol-type">string</span> <span class="sol-variable">name</span>;
        <span class="sol-type">uint</span> <span class="sol-variable">voteCount</span>;
    }

    <span class="sol-comment">// Store accounts that have voted</span>
    <span class="sol-keyword">mapping</span>(<span class="sol-type">address</span> => <span class="sol-type">bool</span>) <span class="sol-keyword">public</span> <span class="sol-variable">voters</span>;
    
    <span class="sol-comment">// Store candidates</span>
    <span class="sol-struct">Candidate</span>[] <span class="sol-keyword">public</span> <span class="sol-variable">candidates</span>;
    
    <span class="sol-comment">// Store the total number of votes</span>
    <span class="sol-type">uint</span> <span class="sol-keyword">public</span> <span class="sol-variable">totalVotes</span>;
    
    <span class="sol-comment">// Event triggered when a vote is cast</span>
    <span class="sol-keyword">event</span> <span class="sol-event">VoteCast</span>(<span class="sol-type">address</span> <span class="sol-keyword">indexed</span> <span class="sol-variable">voter</span>, <span class="sol-type">uint</span> <span class="sol-variable">candidateId</span>);
    
    <span class="sol-keyword">constructor</span>() {
        <span class="sol-comment">// Initialize candidates</span>
        <span class="sol-function">addCandidate</span>(<span class="sol-string">"Candidate A"</span>);
        <span class="sol-function">addCandidate</span>(<span class="sol-string">"Candidate B"</span>);
        <span class="sol-function">addCandidate</span>(<span class="sol-string">"Candidate C"</span>);
    }
    
    <span class="sol-keyword">function</span> <span class="sol-function">addCandidate</span>(<span class="sol-type">string</span> <span class="sol-keyword">memory</span> <span class="sol-variable">name</span>) <span class="sol-keyword">private</span> {
        <span class="sol-variable">candidates</span>.push(<span class="sol-struct">Candidate</span>({
            <span class="sol-variable">id</span>: <span class="sol-variable">candidates</span>.length + <span class="sol-number">1</span>,
            <span class="sol-variable">name</span>: <span class="sol-variable">name</span>,
            <span class="sol-variable">voteCount</span>: <span class="sol-number">0</span>
        }));
    }
    
    <span class="sol-keyword">function</span> <span class="sol-function">vote</span>(<span class="sol-type">uint</span> <span class="sol-variable">candidateId</span>) <span class="sol-keyword">public</span> {
        <span class="sol-comment">// Check if voter has already voted</span>
        <span class="sol-keyword">require</span>(!<span class="sol-variable">voters</span>[<span class="sol-builtin">msg.sender</span>], <span class="sol-string">"You have already voted"</span>);
        
        <span class="sol-comment">// Check if candidateId is valid</span>
        <span class="sol-keyword">require</span>(<span class="sol-variable">candidateId</span> > <span class="sol-number">0</span> && <span class="sol-variable">candidateId</span> <= <span class="sol-variable">candidates</span>.length, <span class="sol-string">"Invalid candidate ID"</span>);
        
        <span class="sol-comment">// Record that voter has voted</span>
        <span class="sol-variable">voters</span>[<span class="sol-builtin">msg.sender</span>] = <span class="sol-boolean">true</span>;
        
        <span class="sol-comment">// Update candidate vote count</span>
        <span class="sol-variable">candidates</span>[<span class="sol-variable">candidateId</span> - <span class="sol-number">1</span>].<span class="sol-variable">voteCount</span>++;
        <span class="sol-variable">totalVotes</span>++;
        
        <span class="sol-comment">// Trigger vote cast event</span>
        <span class="sol-keyword">emit</span> <span class="sol-event">VoteCast</span>(<span class="sol-builtin">msg.sender</span>, <span class="sol-variable">candidateId</span>);
    }
    
    <span class="sol-keyword">function</span> <span class="sol-function">getCandidateCount</span>() <span class="sol-keyword">public</span> <span class="sol-keyword">view</span> <span class="sol-keyword">returns</span> (<span class="sol-type">uint</span>) {
        <span class="sol-keyword">return</span> <span class="sol-variable">candidates</span>.length;
    }
}`;

  // Generate a random wallet address
  const generateRandomWallet = () => {
    setHasVoted(false);
    const randomHex = () => Math.floor(Math.random() * 16).toString(16);
    let address = "0x";
    for (let i = 0; i < 40; i++) {
      address += randomHex();
    }
    setVotingAddress(address);
    setMessage({ 
      text: `Random wallet generated: ${address.substring(0, 8)}...${address.substring(36)}`, 
      type: "info" 
    });
    
    // Clear message after 5 seconds
    setTimeout(() => {
      setMessage({ text: "", type: "" });
    }, 5000);
  };

  // Auto-generate a wallet on component mount
  useEffect(() => {
    generateRandomWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mock voting function
  const castVote = (candidateId) => {
    if (hasVoted) {
      setError("You have already voted!")
      return
    }

    if (!votingAddress) {
      setError("Please enter your wallet address")
      return
    }

    setError("")
    setTransactionPending(true)

    // Simulate blockchain transaction delay
    setTimeout(() => {
      setCandidates(candidates.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, votes: candidate.votes + 1 } 
          : candidate
      ))
      
      // Add transaction to history
      const timestamp = new Date().toISOString()
      setTransactionHistory([
        { 
          hash: "0x" + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10),
          from: votingAddress,
          to: "0xContractAddress",
          candidateId,
          timestamp
        },
        ...transactionHistory
      ])

      setHasVoted(true)
      setTransactionPending(false)
      
      // Show success message
      setMessage({ 
        text: `Vote cast successfully for Candidate ${String.fromCharCode(64 + candidateId)}!`, 
        type: "success" 
      });
      
      // Clear message after 5 seconds
      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 5000);
    }, 2000)
  }

  const resetVotes = () => {
    setCandidates(candidates.map(candidate => ({ ...candidate, votes: 0 })))
    setHasVoted(false)
    setTransactionHistory([])
    setError("")
    generateRandomWallet();
  }

  return (
    <div className="shadcn-card">
      <div className="shadcn-card-header">
        <h3 className="text-xl md:text-2xl font-semibold text-foreground">Voting Smart Contract</h3>
        <p className="text-sm md:text-base text-muted-foreground">Cast your vote on the blockchain</p>
      </div>
      <div className="shadcn-card-content">
        <div className="bg-secondary/10 p-4 rounded-md mb-6">
          <div className="font-mono text-xs md:text-sm p-3 bg-card rounded-md overflow-auto border border-secondary/20">
            <pre className="solidity-code" dangerouslySetInnerHTML={{ __html: votingContractCode }} />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="address" className="block text-sm font-medium text-muted-foreground">
              Your Wallet Address
            </label>
            <button 
              onClick={generateRandomWallet}
              className="text-xs text-primary hover:text-primary/80 font-medium"
              disabled={transactionPending}
            >
              Generate New Wallet
            </button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              id="address"
              className="w-full bg-secondary/5 border border-secondary/20 rounded-md px-3 py-2 text-sm font-mono"
              placeholder="0x..."
              value={votingAddress}
              onChange={(e) => setVotingAddress(e.target.value)}
              disabled={hasVoted || transactionPending}
            />
          </div>
          
          {message.text && (
            <div className={`mt-2 p-2 rounded-md text-sm font-medium ${
              message.type === 'success' ? 'bg-green-500/10 text-green-500' : 
              message.type === 'info' ? 'bg-blue-500/10 text-blue-500' : 
              message.type === 'warning' ? 'bg-yellow-500/10 text-yellow-500' : 
              'bg-red-500/10 text-red-500'
            }`}>
              {message.type === 'success' && (
                <span className="inline-flex items-center">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  {message.text}
                </span>
              )}
              {message.type === 'info' && (
                <span className="inline-flex items-center">
                  <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                  {message.text}
                </span>
              )}
            </div>
          )}
          
          {!message.text && (
            <p className="text-xs text-muted-foreground mt-2">
              A random wallet has been generated for you to use in this demo.
            </p>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {candidates.map(candidate => (
            <div key={candidate.id} className="border rounded-md p-4 bg-card transition-colors hover:bg-secondary/5">
              <h4 className="font-medium mb-2">{candidate.name}</h4>
              <div className="text-2xl font-bold text-primary mb-2">{candidate.votes}</div>
              <button 
                className={`w-full px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  hasVoted || transactionPending 
                    ? "bg-secondary/40 text-muted-foreground cursor-not-allowed" 
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
                onClick={() => castVote(candidate.id)}
                disabled={hasVoted || transactionPending}
              >
                {transactionPending ? "Processing..." : "Vote"}
              </button>
            </div>
          ))}
        </div>

        <div className="mb-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-secondary text-secondary-foreground rounded-md text-sm font-medium hover:bg-secondary/80"
            onClick={resetVotes}
          >
            Reset Demo
          </button>
        </div>

        {/* Blockchain Transactions */}
        {transactionHistory.length > 0 && (
          <div className="mt-8">
            <h4 className="text-lg font-medium mb-3">Transaction History</h4>
            <div className="border rounded-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/20 text-xs font-medium text-muted-foreground">
                    <tr>
                      <th className="p-3 text-left">Transaction Hash</th>
                      <th className="p-3 text-left">From</th>
                      <th className="p-3 text-left">To</th>
                      <th className="p-3 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {transactionHistory.map((tx, index) => (
                      <tr key={index} className="bg-card text-xs">
                        <td className="p-3 font-mono">{tx.hash}</td>
                        <td className="p-3 font-mono truncate max-w-[150px]">{tx.from}</td>
                        <td className="p-3 font-mono">{tx.to}</td>
                        <td className="p-3">{new Date(tx.timestamp).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SmartContracts() {
  return (
    <div className="flex flex-col min-h-screen bg-background mt-4">
      <Header />
      <TopBar />
      <div className="bg-gradient-to-b from-secondary to-background pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <section className="flex flex-col items-center text-center">            
            <h1 className="text-3xl md:text-5xl font-bold leading-tight md:leading-tight mb-6">
              Build with <span className="gradient-heading">Smart Contracts</span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to create and interact with blockchain smart contracts
            </p>
          </section>
        </div>
      </div>

      <main className="flex-1 mx-auto px-4 max-w-4xl w-full py-8">
        <section className="mb-12">
          <div className="space-y-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">What are Smart Contracts?</h2>
            <p className="text-muted-foreground">
              Smart contracts are self-executing programs that run on a blockchain when predetermined conditions are met. 
              They automatically enforce and execute the terms of an agreement, eliminating the need for intermediaries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Trustless Execution</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts execute automatically when conditions are met, removing the need to trust a third party for enforcement.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg border shadow-sm">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Decentralization</h3>
              <p className="text-sm text-muted-foreground">
                Smart contracts run on decentralized blockchain networks, making them resistant to censorship and single points of failure.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Interactive Voting System</h2>
          <p className="text-muted-foreground mb-6">
            This example demonstrates a simple voting system implemented as a smart contract. 
            Users can cast votes for candidates, and the results are stored on the blockchain.
          </p>
          
          <VotingSystem />
        </section>
      </main>

      <Footer />
    </div>
  )
} 