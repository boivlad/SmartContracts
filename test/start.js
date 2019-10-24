const Market = artifacts.require('Market');
const Project = artifacts.require('Project');

contract('Market test', async accounts => {
	const TokenAmount = 12;
	const buyer = accounts[1];
	const TokenPrice = 9000000000000000;
	const nameOfProject = 'FirstProject';

	it('Create New Project', async () => {
		const	market = await Market.deployed();

		await market.createProject(nameOfProject, 'Some description about this project', TokenPrice, 100);

		console.log('Баланс до покупки ' + TokenAmount + ' акций:');
		console.log('Акций в Маркете: ' + await	market.getSharesCount(nameOfProject));
		console.log('Акций у покупателя: ' + await	market.getSharesClientCount(nameOfProject, accounts[1]));
	});

	it('Buy Shares', async () => {
		const	market = await Market.deployed();

		await	market.buyShares(nameOfProject, TokenAmount, {
			from: buyer,
			value: TokenPrice * TokenAmount,
			gas: 1000000
		});

		console.log('Баланс после покупки ' + TokenAmount + ' акций:');
		console.log('Акций в Маркете: ' + await	market.getSharesCount(nameOfProject));
		console.log('Акций у покупателя: ' + await	market.getSharesClientCount(nameOfProject, accounts[1]));
	});

  it('Sell Shares', async () => {
		const	market = await Market.deployed();

		let sellTokenAmount = 2;
		let projectAddress = await market.Projects.call(nameOfProject);
		let project = await Project.at(projectAddress);

		await	project.approve(market.address, sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});

		await	market.sellShares(nameOfProject, sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});

		console.log('Баланс после продажи ' + sellTokenAmount + ' акций:');
		console.log('Акций в Маркете: ' + await	market.getSharesCount(nameOfProject));
		console.log('Акций у покупателя: ' + await	market.getSharesClientCount(nameOfProject, accounts[1]));
	});

  it('Get Project Info', async () => {
		const	market = await Market.deployed();
		await getProjectInfo(market, nameOfProject);
	});
});

async function getProjectInfo (market, name) {
	console.log(
		'\nИнформация о проекте: ' + name +
		'\nAddress: ' + await	market.getProjectAddress(name) +
		'\nOwner: ' + await	market.getProjectOwner(name) +
		'\nDescription: ' + await	market.getProjectDescription(name) +
		'\nPrice: ' + await	market.getPrice(name) +
		'\nAvailable Shares: ' + await	market.getSharesCount(name)
	);
}