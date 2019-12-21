const Market = artifacts.require('Market');
const Project = artifacts.require('Project');

contract('Test all Project functions', async () => {
	it('Create Project', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject';

		const market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);

		assert.equal(await market.getProjectDescription(nameOfProject), 'Some description about this project');
	});

	it('Get project address', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject1';

		const market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);
		const projectAddress = await market.getProjectAddress(nameOfProject);
		assert.equal(projectAddress.length, 42);
	});

	it('Get project owner address', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject2';

		const market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);
		const ownerAddress = await market.getProjectOwner(nameOfProject);
		assert.equal(ownerAddress.length, 42);
	});

	it('Get project description', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject3';

		const market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);
		const projectDescription = await market.getProjectDescription(nameOfProject);
		assert.equal(projectDescription, 'Some description about this project');
	});

	it('Get project shares price', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject4';

		const market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);
		const sharesPrice = await market.getPrice(nameOfProject);
		assert.equal(sharesPrice, tokenPrice);
	});
	
	it('Get shares count', async () => {
		const tokenPrice = 9000000000000000;
		const nameOfProject = 'FirstProject5';

		const market = await Market.deployed();
		await market.createProject(nameOfProject, 'Some description about this project', tokenPrice, 100);
		const sharesCount = await market.getSharesCount(nameOfProject);
		assert.equal(sharesCount, 100);
	});
});
