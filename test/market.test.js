const Market = artifacts.require('Market');
const Project = artifacts.require('Project');

contract('Test market functions', async accounts => {
	it('Should return true when the call function checkContract', async () => {
		const	market = await Market.deployed();
		assert.equal(await market.checkContract(), true);
	})

	it('Buy Shares', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject';
		const buyer = accounts[1];
		const tokenAmount = 12;

		const	market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);

		const currentPrice = await market.getPrice(nameOfProject);

		await	market.buyShares(nameOfProject, tokenAmount, {
			from: buyer,
			value: currentPrice * tokenAmount,
			gas: 1000000
		});
		assert.equal(await	market.getSharesCount(nameOfProject), 100 - tokenAmount);
		assert.equal(await market.getSharesClientCount(nameOfProject, buyer), tokenAmount);
	});

	it('Sell Shares', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject';
		const buyer = accounts[1];
		const tokenAmount = 12;
		const sellTokenAmount = 10;

		const	market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);

		const currentPrice = await market.getPrice(nameOfProject);
		await	market.buyShares(nameOfProject, tokenAmount, {
			from: buyer,
			value: currentPrice * tokenAmount,
			gas: 1000000
		});
		const projectAddress = await market.getProjectAddress(nameOfProject);
		const project = await Project.at(projectAddress);

		await	project.approve(market.address, sellTokenAmount, {
			from: buyer
		});

		await	market.sellShares(nameOfProject, sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});
		assert.equal(await market.getSharesCount(nameOfProject), 98);
		assert.equal(await market.getSharesClientCount(nameOfProject, buyer), 2);
	});
});


