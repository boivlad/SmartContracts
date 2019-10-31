pragma solidity ^0.5.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract Project is ERC20 {
	address owner;
	string name;
	string description;
	uint currentPrice;
	uint defaultPrice;

	constructor (
		address _owner,
		string memory _name,
		string memory _description,
		uint _price,
		uint256 _shares
	)
	public
	{
		owner = _owner;
		name = _name;
		description = _description;
		defaultPrice = _price;
		currentPrice = defaultPrice;
		_mint(msg.sender, _shares);
	}

	function getDescription() public view returns(string memory) {
		return description;
	}

	function getOwner() public view returns(address) {
		return owner;
	}
	function calculatePrice() public {
		currentPrice = this.totalSupply()*this.getPrice()/this.balanceOf(msg.sender);
	}
	function getPrice() public view returns(uint) {
		return currentPrice;
	}
}