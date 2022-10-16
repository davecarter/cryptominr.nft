// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract BlockMinr {
    struct Block {
        uint256 id;
        string title;
        string blockData;
        string date;
        uint256 previousHash;
        uint256 currentHash;
        uint256 nonce;
        uint256 difficulty;
    }
    mapping(uint256 => Block) public blocks;
    event savingsEvent(uint256 indexed _blockId);
    uint256 public blockCount;

    constructor() {
        blockCount = 0;
    }

    function addBlock(
        string memory _title,
        string memory _blockData,
        string memory _date,
        uint256 _previousHash,
        uint256 _currentHash,
        uint256 _nonce,
        uint256 _difficulty
    ) public {
        blocks[blockCount] = Block(
            blockCount,
            _title,
            _blockData,
            _date,
            _previousHash,
            _currentHash,
            _nonce,
            _difficulty
        );
        blockCount++;
    }

    //return Single structure
    function get(uint256 _blockId) public view returns (Block memory) {
        return blocks[_blockId];
    }

    //return Array of structure Value
    function getBlock()
        public
        view
        returns (
            uint256[] memory,
            string[] memory,
            string[] memory,
            string[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory,
            uint256[] memory
        )
    {
        uint256[] memory id = new uint256[](blockCount);
        string[] memory title = new string[](blockCount);
        string[] memory blockData = new string[](blockCount);
        string[] memory date = new string[](blockCount);
        uint256[] memory previousHash = new uint256[](blockCount);
        uint256[] memory currentHash = new uint256[](blockCount);
        uint256[] memory nonce = new uint256[](blockCount);
        uint256[] memory difficulty = new uint256[](blockCount);

        for (uint256 i = 0; i < blockCount; i++) {
            Block storage item = blocks[i];
            id[i] = item.id;
            title[i] = item.title;
            blockData[i] = item.blockData;
            date[i] = item.date;
            previousHash[i] = item.previousHash;
            currentHash[i] = item.currentHash;
            nonce[i] = item.nonce;
            difficulty[i] = item.difficulty;
        }

        return (id, title, blockData, date, previousHash, currentHash, nonce, difficulty);
    }

    //return Array of structure
    function getBlocks() public view returns (Block[] memory) {
        Block[] memory id = new Block[](blockCount);
        for (uint256 i = 0; i < blockCount; i++) {
            Block storage item = blocks[i];
            id[i] = item;
        }
        return id;
    }
}
