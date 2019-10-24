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
##In
## Methods:

**getProjectAddress(string memory name)** - ***return Project address by name;***

**getProjectDescription(string memory name)** - ***return Project description by name;***

**getProjectOwner(string memory name)** - ***return Project owner by name;***

**getPrice(string memory name)** - ***return Project count Wei for 1 share by name;***

**getSharesCount(string memory name)** - ***return available count of shares by name;***

