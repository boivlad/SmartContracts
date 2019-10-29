const Market = artifacts.require('Market');
const Project = artifacts.require('Project');

contract('Project test', async accounts => {
	const TokenAmount = 12;
	const buyer = accounts[1];
	let TokenPrice = 9000000000000000;
	const nameOfProject = 'FirstProject';

	it('Create New Project: Should return "Some description about this project"', async () => {
		const	market = await Market.deployed();

		await market.createProject(nameOfProject, 'Some description about this project', TokenPrice, 100);

		assert.equal(await market.getProjectDescription(nameOfProject), 'Some description about this project');
	});

	it('Buy Shares', async () => {
		const	market = await Market.deployed();
		TokenPrice = await market.getPrice(nameOfProject);
		await	market.buyShares(nameOfProject, TokenAmount, {
			from: buyer,
			value: TokenPrice * TokenAmount,
			gas: 1000000
		});
		assert.equal(await	market.getSharesCount(nameOfProject), 100-TokenAmount);
		assert.equal(await market.getSharesClientCount(nameOfProject, buyer), TokenAmount);
	});

  	it('Sell Shares', async () => {
		const	market = await Market.deployed();
		let sellTokenAmount = 2;
		let projectAddress = await market.getProjectAddress(nameOfProject);
		let project = await Project.at(projectAddress);

		await	project.approve(market.address, sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});

		await	market.sellShares(nameOfProject, sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});
		assert.equal(await market.getSharesCount(nameOfProject), 90);
		assert.equal(await market.getSharesClientCount(nameOfProject, buyer), 10);
	});

  	it('Get Project Info', async () => {
		const	market = await Market.deployed();
		assert.equal(await getProjectInfo(market, nameOfProject), true);
	});
});

async function getProjectInfo (market, name) {
	let info = (
		'\nИнформация о проекте: ' + name +
		'\nAddress: ' + await	market.getProjectAddress(name) +
		'\nOwner: ' + await	market.getProjectOwner(name) +
		'\nDescription: ' + await	market.getProjectDescription(name) +
		'\nPrice: ' + await	market.getPrice(name) +
		'\nAvailable Shares: ' + await	market.getSharesCount(name)
	);
	// console.log(info);
	return true;
}
