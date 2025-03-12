# Cryptominr

Cryptominr is an educational application designed to help users visualize and understand the foundational concepts behind blockchain technology. Through an intuitive interface, users can simulate the process of mining and building a blockchain in a simplified environment.

## Key Features

- **Interactive Mining Simulation**: Create and mine blocks by providing a title and text content.
- **Proof-of-Work Visualization**: Adjust the difficulty level to see how it affects the time required to find a valid hash.
- **Cryptographic Security**: Understand how valid blocks are linked together to form a secure blockchain.

This hands-on approach demystifies blockchain concepts, making it ideal for learners and enthusiasts alike.

## How Cryptominr Works

1. **Add Block Data**:
   - Enter a title and content for a block.

2. **Start Mining**:
   - Click the **Mine Block!** button to simulate the mining process.
   - The system calculates a hash based on the block data and searches for one with a required number of leading zeros (determined by the difficulty level).

3. **Blockchain Formation**:
   - Once a valid hash is found, it becomes the identifier for the block and is used to link to the next block in the chain.
   - Each block is cryptographically secured, demonstrating how blockchains ensure data integrity.

## Where to Find Cryptominr

Cryptominr is hosted on **[cryptominr.vercel.app](https://cryptominr.vercel.app/)** and accessible via a redirection from a static `index.html` file stored on the **InterPlanetary File System (IPFS)** accessing via the `.nft` domain at: **[https://cryptominr.nft](https://cryptominr.nft/)**.

### What is IPFS?

The **InterPlanetary File System (IPFS)** is a decentralized storage and sharing protocol that transforms how we access and share data on the internet. Unlike traditional HTTP:
- **Content-Based Addressing**: Files are retrieved using their unique cryptographic hash, ensuring integrity and immutability.
- **Peer-to-Peer Sharing**: Data is distributed across nodes, making it faster, more secure, and resilient to failures.

By using IPFS, Cryptominr showcases modern decentralized technologies and highlights their potential applications in real-world systems.

---

## Explore Cryptominr

🔗 **[Launch Cryptominr Now](https://cryptominr.vercel.app/)**

🔗 **[Access Cryptominr documentation](https://cryptominr.vercel.app/docs)**


---

## Screenshots

### Entering Block Data
![Entering block data](/public/images/initial-block-data.png)
- Add a **title** and some **text content**, which can represent a list of transactions.
- Observe the `Current Hash` value while adding data: it updates dynamically with every keystroke, demonstrating how even small changes in the data completely alter the hash.

---

### Mining a Block
![Mining Process](/public/images/mining-block-data.png)
- Press the **"Mine Block"** button to start the mining process.
- The algorithm will increment the `Nonce` value until it finds a randomly generated hash that satisfies the required number of leading zeros based on the specified difficulty level.
- This simulates the proof-of-work mechanism used in real-world blockchain systems.

---

### Blockchain Overview
![The Initial Blockchain](/public/images/mined-block-hash.png)
- Once mined, the block will display its `Current Hash` value, which includes the required leading zeros.
- The `Current Hash` of the mined block becomes the `Previous Hash` for the next block, forming a **chain of blocks**.
- The `nonce` represents the number of iterations required to find a valid hash. Higher difficulty levels increase the number of required iterations, resulting in longer mining times.
- This structure, protected by cryptographic proof of work, ensures the integrity of the blockchain and defends against tampering.



---

## Contributing

Contributions are welcome! Here's how you can get involved:

1. **Report Bugs**: If you encounter issues, open a ticket on the [issue tracker](https://github.com/davecarter/cryptominr.nft/issues).
2. **Code Contributions**:
   - Show your love by starring the repository.
   - Fork the repository.
   - Create a feature branch.
   - Submit a pull request with a detailed explanation of your changes.

---

## Technologies Used

- **Frontend**: [NextJS, React, Hexagonal Arch]
- **Data persistency**: [IndexDB]
- **Deployment**: [Vercel](https://vercel.com/) and [IPFS](https://ipfs.io/)

---

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it.

---

## Acknowledgements

- Inspired by the need to simplify blockchain concepts for educational purposes.
- Built with ❤️ by [David Garcia](https://github.com/davecarter).
- Designed with ❤️ by [Richard Lozada](https://github.com/lozadaa).

