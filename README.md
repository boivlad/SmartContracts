# SmartContracts
---
## Task A:
Create the dApp (only smart-contracts part), where user could create a project with (name, description) and issue shares for this project.
All created projects store on market, where users could get project info, get price for project share, get available count of shares, buy shares using ETH, sell shares.

## Stack:
    Ethereum (ropstan/kovan)
    Truffle
    ganache-cli
    Solidity
## Dependencies install

### _node & npm_ & truffle

<https://github.com/nvm-sh/nvm>

To install and use node LTS version:

```
npm install -g truffle
```

### _ganache-cli_

https://github.com/trufflesuite/ganache-cli#installation

### _ganache_

https://github.com/trufflesuite/ganache/releases

## _Environment desc_

```bash
node -v
v10.16.0

npm -v
6.9.0

```

## _Install_

---

```bash
npm i
```

## _Tests_

---

To run tests:

Start development blockchain with run `truffle test`


---
## How to use:
### Create Market
Use ***deployed***
### Create Project
Use method ***createProject(string memory name, string memory description, uint price, uint256 amount)*** by ***Market*** 
### Buy Shares
Use ***buyShares(string memory name, uint tokenAmount)*** by ***Market*** 
### Buy Shares
Use ***approve(address MarketAddress, uint selltokenAmount)*** by ***Project*** 

Use ***sellShares(string memory name, uint selltokenAmount)*** by ***Market*** 

## Methods:

**getProjectAddress(string memory name)** - ***return Project address by name;***

**getProjectDescription(string memory name)** - ***return Project description by name;***

**getProjectOwner(string memory name)** - ***return Project owner by name;***

**getPrice(string memory name)** - ***return Project count Wei for 1 share by name;***

**getSharesCount(string memory name)** - ***return available count of shares by name;***

