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
npm install -g truffle && truffle use v5.0.40
npm install 10.16.3 && npm use v10.16.3
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

1. Start development blockchain with `ganache-cli` OR Start `Ganache App` and run `npm truffle console`

2. Start tests with `truffle test`


---
## Methods:

**getProjectAddress(string memory name)** - ***return Project address by name;***

**getProjectDescription(string memory name)** - ***return Project description by name;***

**getProjectOwner(string memory name)** - ***return Project owner by name;***

**getPrice(string memory name)** - ***return Project count Wei for 1 share by name;***

**getSharesCount(string memory name)** - ***return available count of shares by name;***

