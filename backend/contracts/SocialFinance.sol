// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

contract SocialFinance {
    // Declare state variables for tracking users' funds and balances
    mapping(address => uint256) public balances;
    mapping(address => bool) public registeredUsers;
    
    address public owner;
    
    // Event to emit when a user deposits funds
    event FundsDeposited(address indexed user, uint256 amount);
    
    // Event to emit when a user withdraws funds
    event FundsWithdrawn(address indexed user, uint256 amount);
    
    // Constructor to set the owner of the contract
    constructor() {
        owner = msg.sender;
    }
    
    // Modifier to restrict access to only the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
    
    // Function to register a user
    function registerUser(address user) public onlyOwner {
        registeredUsers[user] = true;
    }
    
    // Function for users to deposit funds
    function depositFunds() public payable {
        require(registeredUsers[msg.sender], "You must be a registered user to deposit funds");
        balances[msg.sender] += msg.value;
        emit FundsDeposited(msg.sender, msg.value);
    }
    
    // Function to allow users to withdraw funds
    function withdrawFunds(uint256 amount) public {
        require(registeredUsers[msg.sender], "You must be a registered user to withdraw funds");
        require(balances[msg.sender] >= amount, "Insufficient balance");
        
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        
        emit FundsWithdrawn(msg.sender, amount);
    }
    
    // Function to get the balance of a user
    function getBalance(address user) public view returns (uint256) {
        return balances[user];
    }
    
    // Function to transfer remaining contract balance to the owner
    function transferRemainingBalance() public onlyOwner {
        uint256 contractBalance = address(this).balance;
        payable(owner).transfer(contractBalance);
    }
}
