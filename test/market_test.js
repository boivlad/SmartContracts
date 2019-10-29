const Market = artifacts.require('Market');

contract('Market test', async () => {
	it('Should return true when the call function checkContract', async () => {
		const	market = await Market.deployed();
		assert.equal(await market.checkContract(), true);
	})
});