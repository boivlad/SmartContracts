const Market = artifacts.require("Market");
const Project = artifacts.require("Project");

contract("Market test", async accounts => {

  it("New Project", async () => {
		let	market = await Market.deployed();
		await market.createProject("FirstProject", "Some description about this project", 9000000000000000, 100);
		let projectAddress = await market.Projects.call("FirstProject");
		let project = await Project.at(projectAddress);
		let buyer = accounts[1];
		let TokenPrice = 9000000000000000;
		let TokenAmount = 12;
		console.log("Баланс до покупки " + TokenAmount + " акций:");
		console.log("Акций в Маркете: " + await	market.getSharesCount("FirstProject"));
		console.log("Акций у покупателя: " + await	market.getSharesClientCount("FirstProject", accounts[1]));
    await	market.buyShares("FirstProject", TokenAmount, {
			from: buyer,
			value: TokenPrice * TokenAmount,
			gas: 1000000
		});
		console.log("Баланс после покупки " + TokenAmount + " акций:");
		console.log("Акций в Маркете: " + await	market.getSharesCount("FirstProject"));
		console.log("Акций у покупателя: " + await	market.getSharesClientCount("FirstProject", accounts[1]));
		let sellTokenAmount = 2;
		await	project.approve(market.address, sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});
		await	market.sellShares("FirstProject", sellTokenAmount, {
			from: buyer,
			gas: 1000000
		});
		console.log("Баланс после продажи " + sellTokenAmount + " акций:");
		console.log("Акций в Маркете: " + await	market.getSharesCount("FirstProject"));
		console.log("Акций у покупателя: " + await	market.getSharesClientCount("FirstProject", accounts[1]));
		await getProjectInfo(market, "FirstProject");
	});
});
async function getProjectInfo (market, name) {
	console.log(
	"\nИнформация о проекте: " + name +
	"\nAddress: " + await	market.getProjectAddress(name) +
	"\nOwner: " + await	market.getProjectOwner(name) +
	"\nDescription: " + await	market.getProjectDescription(name) +
	"\nPrice: " + await	market.getPrice(name) +
	"\nAvailable Shares: " + await	market.getSharesCount(name)
	);
}