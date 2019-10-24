pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Project is ERC20 {
	address owner;
	string name;
	string description;
	uint price;

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
		price = _price;
		_mint(msg.sender, _shares);
	}

	function getDescription() public view returns(string memory) {
		return description;
	}

	function getOwner() public view returns(address) {
		return owner;
	}

	function getPrice() public view returns(uint) {
		return price;
	}
}