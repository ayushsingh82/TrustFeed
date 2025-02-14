// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract NewsVerification {
    struct News {
        address submitter;
        string contentHash;
        bool verified;
        address verifier;
    }

    mapping(bytes32 => News) public newsRecords;
    mapping(address => bool) public factCheckers;
    address public owner;

    event NewsSubmitted(address indexed submitter, bytes32 indexed newsId, string contentHash);
    event NewsVerified(address indexed verifier, bytes32 indexed newsId, bool verified);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    modifier onlyFactChecker() {
        require(factCheckers[msg.sender], "Not a fact-checker");
        _;
    }

    constructor() {
        owner = msg.sender;
    }
    
    function addFactChecker(address _factChecker) external onlyOwner {
        factCheckers[_factChecker] = true;
    }
    
    function removeFactChecker(address _factChecker) external onlyOwner {
        factCheckers[_factChecker] = false;
    }
    
    function submitNews(string memory _contentHash) external {
        bytes32 newsId = keccak256(abi.encodePacked(_contentHash, msg.sender, block.timestamp));
        require(newsRecords[newsId].submitter == address(0), "News already submitted");
        
        newsRecords[newsId] = News({
            submitter: msg.sender,
            contentHash: _contentHash,
            verified: false,
            verifier: address(0)
        });
        
        emit NewsSubmitted(msg.sender, newsId, _contentHash);
    }
    
    function verifyNews(bytes32 _newsId, bool _status) external onlyFactChecker {
        require(newsRecords[_newsId].submitter != address(0), "News not found");
        require(!newsRecords[_newsId].verified, "Already verified");
        
        newsRecords[_newsId].verified = _status;
        newsRecords[_newsId].verifier = msg.sender;
        
        emit NewsVerified(msg.sender, _newsId, _status);
    }
}
