import { Header } from "components/Header"
import { Footer } from "components/Footer"
import { TopBar } from "components/TopBar"
import { useRouter } from "next/router"
import { Sidebar } from "components/Sidebar"

export default function Docs() {
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden mt-4">
      <Header />
      <TopBar />
      <div className="bg-gradient-to-b from-secondary to-background pb-12 pt-16 md:pb-16 md:pt-24">
        <div className="container">
          <section className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
              <span className="gradient-heading">Blockchain Fundamentals</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto">
              Learn how blockchain technology works and why it's revolutionizing digital transactions
            </p>
          </section>
        </div>
      </div>
      <main className="flex-1 container py-8 px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row">
          <Sidebar />
          <div className="w-full lg:flex-1 lg:pl-8 mt-8 lg:mt-0">
            <section className="space-y-8">
              <div className="shadcn-card">
                <div className="shadcn-card-header">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground" id="what-problem-solves-a-blockchain">What problem solves a Blockchain?</h2>
                </div>
                <div className="shadcn-card-content space-y-4">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Sending digital information across the internet is easy. Every time we share a picture, we're
                    actually sending a copy of the original file. But what happens when we need to transfer value?
                    Unlike a picture, value shouldn't be duplicated—we want to send it only once while ensuring it isn't
                    copied or spent more than once. This challenge is known as the
                    <strong className="text-foreground"> double-spending problem</strong>. Blockchain addresses this issue by creating a transparent
                    and immutable digital ledger that ensures secure and verifiable transactions.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    A blockchain is a <strong className="text-foreground">decentralized</strong>, distributed ledger that records transactions
                    across a network of computers. Each transaction is grouped into a block, which is cryptographically
                    linked to the previous block, forming a chain. This structure ensures that once a block is added to
                    the chain, it cannot be altered without changing all subsequent blocks, making the data
                    tamper-proof.
                  </p>
                </div>
              </div>

              <div className="shadcn-card">
                <div className="shadcn-card-header">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground" id="decentralized-execution">Decentralized execution</h2>
                </div>
                <div className="shadcn-card-content space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <p className="text-sm md:text-base text-muted-foreground">
                      The execution of Ethereum smart contract code ensures that the deployed code will continue to
                      function in the same way indefinitely. Each node in the network maintains a copy of this code, and
                      the underlying protocol guarantees that it is always executed consistently.
                    </p>
                    <div className="flex justify-center">
                      <img 
                        src="/images/decentralized.jpg" 
                        alt="Decentralized execution" 
                        className="rounded-lg object-cover max-h-60 shadow-lg shadow-blue-500/20" 
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="shadcn-card">
                <div className="shadcn-card-header">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground" id="cryptographically-protected">Cryptographically protected</h2>
                </div>
                <div className="shadcn-card-content">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Value is stored safely using cryptography without any other third party entity being involved in the
                    process. Imagine that you want to send a message to a friend safely without anyone being able to get
                    its contents if the message is intercepted. You can encrypt the message using a secret key, and only
                    your friend can decrypt it using the same key. This is how blockchain works, but on a much larger
                    scale because we are sending value across a network of computers of unknown entities so we need to
                    ensure that the value is safe and secure.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground mt-4">
                    By securing the data with cryptography,
                    <strong className="text-foreground">
                      {" "}we can trust that infrastructure without having to trust the entities that are part of it
                      removing the need for a third party to validate the transactions.
                    </strong>
                  </p>
                </div>
              </div>

              <div className="shadcn-card">
                <div className="shadcn-card-header">
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground" id="hashing-functions">Hashing functions</h2>
                </div>
                <div className="shadcn-card-content">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex justify-center">
                      <img 
                        src="/images/hashing.jpg" 
                        alt="Hashing functions" 
                        className="rounded-lg object-cover max-h-60 shadow-lg shadow-blue-500/20" 
                      />
                    </div>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Hashing functions allows cyphering any data of any size into a fixed-size string of characters. This
                      is useful because it allows us to store data in a more efficient way and to ensure that the data has
                      not been tampered with. If the data is changed, the hash will change as well. This is how blockchain
                      ensures that the data is secure and has not been tampered with.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="my-16 text-center py-8 md:py-12 bg-secondary/20 rounded-lg">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">Ready to try it by yourself?</h2>
              <p className="mb-8 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Start exploring, creating blocks, and understanding the revolutionary technology that's changing the
                digital landscape.
              </p>
              <button 
                onClick={() => router.push("/")} 
                className="shadcn-button shadcn-button-primary px-5 py-2 md:px-6 md:py-3"
              >
                Build your Blockchain
              </button>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
