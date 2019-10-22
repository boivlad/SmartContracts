const Market = artifacts.require("Market");

contract("Market test", async accounts => {

  it("New Project", async () => {
		let instance = await Market.deployed();
		instance.createProject("Name", "Discription", 9000000000000000, 100);
		let buyer = accounts[1];
		let TokenPrice = 9000000000000000;
		let TokenAmount = 99;
    await instance.buyShares("Name", TokenAmount, {
			from: buyer,
			value: TokenPrice * TokenAmount,
			gas: 1000000
		});
		let sellTokenPrice = 9000000000000000;
		let sellTokenAmount = 1;
		await instance.sellShares("Name", accounts[0], sellTokenAmount, {
			from: buyer,
			value: sellTokenPrice * sellTokenAmount,
			gas: 1000000
		});
	});
});