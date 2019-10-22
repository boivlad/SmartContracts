pragma solidity ^0.5.0;
// Market.deployed().then((instance)=>{app = instance;})
// app.createProject("Name", "Discription", 12, 100);

import './Project.sol';
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
contract Market is ERC20{
	event NewProject(uint zombieId, string name, uint dna);

	mapping(string => Project) public Projects;

	function createProject (string memory _name, string memory _description, uint256 _price, uint256 _shares) public {
		Project newProject = new Project(msg.sender, _name, _description, _price, _shares);
  	Projects[_name] = newProject;
	}

	function multiply(uint shares, uint price) internal pure returns (uint) {
       require(price == 0 || (shares * price) / price == shares, "Market: multyply error");
       return shares * price;
   }

	function getSharesCount(string memory name) public view returns(uint256) {
		return Projects[name].balanceOf(address(this));
	}

	function getPrice(string memory name) public view returns(uint) {
		return Projects[name].getPrice();
	}

	function buyShares(string memory name, uint256 _shares ) public payable{
		require(address(Projects[name]) != address(0), "Market: buyShares - Name does not exist!");
		require(msg.value >= multiply(_shares, getPrice(name)), "Market: buyShares - Incorrect amount!");
		require(getSharesCount(name) > _shares, "Market: buyProjectShares - To many shares you want to buy!");
		require(Projects[name].transfer(msg.sender, _shares), "Market: Bad transfer!");
	}
	function sellShares(string memory name, address sender, uint256 _shares ) public payable{
		require(address(Projects[name]) != address(0), "Market: sellShares - Name does not exist!");
		require(Projects[name].balanceOf(sender) < _shares, "Market: sellShares - Incorrect amount!");
		require(Projects[name].transferFrom(sender, address(this), _shares), "Market:sellShares Bad transfer!");
	}
}