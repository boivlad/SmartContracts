pragma solidity ^0.5.0;

import './Project.sol';
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
contract Market is ERC20{

	mapping(string => Project) public Projects;

	function createProject (string memory _name, string memory _description, uint256 _price, uint256 _shares) public returns(Project){
		Project newProject = new Project(msg.sender, _name, _description, _price, _shares);
  	Projects[_name] = newProject;
		return newProject;
	}

	function multiply(uint shares, uint price) internal pure returns (uint) {
		require(price == 0 || (shares * price) / price == shares, "Market: multyply error");
		return shares * price;
	}

	function getProjectAddress(string memory name) public view returns(address) {
		return address(Projects[name]);
	}

	function getProjectDescription(string memory name) public view returns(string memory) {
		return Projects[name].getDescription();
	}

	function getProjectOwner(string memory name) public view returns(address) {
		return Projects[name].getOwner();
	}

	function getSharesCount(string memory name) public view returns(uint256) {
		return Projects[name].balanceOf(address(this));
	}

	function getSharesClientCount(string memory name, address client) public view returns(uint256) {
		return Projects[name].balanceOf(client);
	}

	function getPrice(string memory name) public view returns(uint256) {
		return Projects[name].getPrice();
	}

	function buyShares(string memory name, uint256 _shares ) public payable{
		require(address(Projects[name]) != address(0), "Market: buyShares - Name does not exist!");
		require(msg.value >= multiply(_shares, getPrice(name)), "Market: buyShares - Incorrect amount!");
		require(getSharesCount(name) >= _shares, "Market: buyProjectShares - To many shares you want to buy!");
		require(Projects[name].transfer(msg.sender, _shares), "Market: Bad transfer!");
	}

	function sellShares(string memory name, uint256 _shares ) public payable{
		require(address(Projects[name]) != address(0), "Market: sellShares - Name does not exist!");
		require(Projects[name].balanceOf(msg.sender) >= _shares, "Market: sellShares - Incorrect amount!");
		require(Projects[name].transferFrom(msg.sender, address(this), _shares), "Market:sellShares Bad transfer!");
	}
}