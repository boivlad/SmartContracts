pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Project is ERC20 {
	address owner;
	address marketAddress;
	string name;
	string description;
	uint256 currentPrice;
	uint256 defaultPrice;

	constructor (
		address _owner,
		string memory _name,
		string memory _description,
		uint256 _price,
		uint256 _shares
	)
	public
	{
		owner = _owner;
		name = _name;
		description = _description;
		defaultPrice = _price;
		currentPrice = defaultPrice;
		marketAddress = msg.sender;
		_mint(msg.sender, _shares);
	}

	function getDescription() public view returns(string memory) {
		return description;
	}

	function getDefaultPrice() public view returns(uint256) {
		return defaultPrice;
	}

	function setCurrentPrice(uint256 price) public {
		currentPrice = price;
	}

	function getOwner() public view returns(address) {
		return owner;
	}
	
	function getPrice() public view returns(uint256) {
		return currentPrice;
	}
}