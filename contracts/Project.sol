pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract Project is ERC20 {
	address public owner;
	string public name;
	string public description;
	uint public price;

	constructor (address _owner, string memory _name, string memory _description, uint256 _price, uint256 _shares) public {
		owner = _owner;
		name = _name;
		description = _description;
		price = _price;
		_mint(msg.sender, _shares);
	}
	function getPrice() public view returns(uint){
		return price;
	}
	function getOwner() public view returns(address) {
		return owner;
	}
	function getBalance(address addr) public payable returns(uint) {
		return this.balanceOf(addr);
	}
}