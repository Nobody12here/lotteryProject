// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CharityRaffle is Ownable {
    struct Item {
        uint256 itemId;
        string itemName;
        uint256 ticketsPurchased;
        address[] participants;
        bool isOver;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public ticketBalances;
    address[] public winner;
    event TicketPurchased(address indexed purchaser, uint256 itemId);
    event WinnerSelected(uint256 indexed itemId, address indexed winner);
    event Withdraw(address indexed owner, uint256 balance);
    uint256 public nextItemId;

    constructor() {
        nextItemId = 1;
        addItem("Laptop");
        addItem("Car");
        addItem("Phone");
        
    }

    function addItem(string memory _itemName) private {
        Item storage newItem = items[nextItemId];
        newItem.itemId = nextItemId;
        newItem.itemName = _itemName;
        nextItemId++;
    }

    function purchaseTickets(uint256 _itemId, uint256 _ticketCount)
        public
        payable
    {
        require(_itemId > 0 && _itemId < nextItemId, "Invalid item ID");
        require(msg.sender != owner(), "Owner cannot purchase tokens");
        
        Item storage chosenItem = items[_itemId];
        require(chosenItem.isOver !=true ,"The lottery is over");
        uint256 totalCost = _ticketCount * 0.01 ether;
        require(msg.value >= totalCost, "Insufficient funds");

        for (uint256 i = 0; i < _ticketCount; i++) {
            chosenItem.participants.push(msg.sender);
            chosenItem.ticketsPurchased++;
            ticketBalances[msg.sender]++;
        }

        emit TicketPurchased(msg.sender, _itemId);
    }

    function conductDraw() public onlyOwner {
        for (uint256 itemId = 1; itemId < nextItemId; itemId++) {
            Item storage chosenItem = items[itemId];
            if (!chosenItem.isOver && chosenItem.participants.length > 0) {
                uint256 randomIndex = generateRandomIndex(
                    chosenItem.participants.length
                );
                winner.push(chosenItem.participants[randomIndex]);

                chosenItem.isOver = true;

                emit WinnerSelected(
                    itemId,
                    chosenItem.participants[randomIndex]
                );

                // Reset participants array and ticket balances for the item
                for (uint256 i = 0; i < chosenItem.participants.length; i++) {
                    delete ticketBalances[chosenItem.participants[i]];
                }
                delete chosenItem.participants;
            }
            else {
                revert("Error: cannot select winner");
            }
        }
    }

    function generateRandomIndex(uint256 _max) private view returns (uint256) {
        uint256 seed = uint256(
            keccak256(abi.encodePacked(block.timestamp, block.difficulty))
        );
        return seed % _max;
    }

    function WithdrawEther() public payable onlyOwner {
        uint256 Balance = address(this).balance;
        require(Balance > 0, "Nothing to withdraw");
        payable(owner()).transfer(Balance);
        emit Withdraw(owner(), Balance);
    }

    function resetLottery() public onlyOwner {
        for (uint256 itemId = 1; itemId < nextItemId; itemId++) {
            Item storage chosenItem = items[itemId];
             for (uint256 i = 0; i < chosenItem.participants.length; i++) {
                    delete ticketBalances[chosenItem.participants[i]];
            }
            delete chosenItem.participants;
            delete winner;
            chosenItem.ticketsPurchased = 0;
            chosenItem.isOver = false;
        }
    }
    function getWinners() public view returns(address[] memory){
        return winner;
    }
}