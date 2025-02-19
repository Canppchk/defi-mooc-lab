const { expect } = require("chai");
const { network, ethers } = require("hardhat");
const { BigNumber, utils } = require("ethers");

describe("Problem 2: liquidate account 0x59CE4a2AC5bC3f5F225439B2993b86B42f6d3e9F", function () {
  // 2000 USDT Liquidation

  it("Using :", async function () {
    console.log("\n\n---------- liquidation by using 2,000 USDT ----------");
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          },
        },
      ],
    });

    const gasPrice = 0;
    const debt = 2000;
    const usdtValue = ethers.utils.parseUnits(debt.toString(), 6);
    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(
      await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const LiquidationOperator = await ethers.getContractFactory(
      "LiquidationOperator_problem2"
    );
    const liquidationOperator = await LiquidationOperator.deploy(
      (overrides = { gasPrice: gasPrice })
    );
    await liquidationOperator.deployed();

    const liquidationTx = await liquidationOperator.operate(
      usdtValue,
      (overrides = { gasPrice: gasPrice })
    );
    const liquidationReceipt = await liquidationTx.wait();

    const liquidationEvents = liquidationReceipt.logs.filter(
      (v) =>
        v &&
        v.topics &&
        v.address === "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" &&
        Array.isArray(v.topics) &&
        v.topics.length > 3 &&
        v.topics[0] ===
          "0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286"
    );

    const expectedLiquidationEvents = liquidationReceipt.logs.filter(
      (v) =>
        v.topics[3] ===
        "0x00000000000000000000000059ce4a2ac5bc3f5f225439b2993b86b42f6d3e9f"
    );

    expect(
      expectedLiquidationEvents.length,
      "no expected liquidation"
    ).to.be.above(0);
    expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(
      expectedLiquidationEvents.length
    );

    const afterLiquidationBalance = BigNumber.from(
      await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
    console.log(
      `Profit :`,
      utils.formatEther(profit),
      "ETH"
    );

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    console.log("--------------------------------------------------");
  });

  // 5000 USDT Liquidation

  it("Using :", async function () {
    console.log("\n\n---------- liquidation by using 5,000 USDT ----------");
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          },
        },
      ],
    });

    const gasPrice = 0;
    const debt = 5000;
    const usdtValue = ethers.utils.parseUnits(debt.toString(), 6);
    const accounts = await ethers.getSigners();
    const liquidator = accounts[0].address;

    const beforeLiquidationBalance = BigNumber.from(
      await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const LiquidationOperator = await ethers.getContractFactory(
      "LiquidationOperator_problem2"
    );
    const liquidationOperator = await LiquidationOperator.deploy(
      (overrides = { gasPrice: gasPrice })
    );
    await liquidationOperator.deployed();

    const liquidationTx = await liquidationOperator.operate(
      usdtValue,
      (overrides = { gasPrice: gasPrice })
    );
    const liquidationReceipt = await liquidationTx.wait();

    const liquidationEvents = liquidationReceipt.logs.filter(
      (v) =>
        v &&
        v.topics &&
        v.address === "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" &&
        Array.isArray(v.topics) &&
        v.topics.length > 3 &&
        v.topics[0] ===
          "0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286"
    );

    const expectedLiquidationEvents = liquidationReceipt.logs.filter(
      (v) =>
        v.topics[3] ===
        "0x00000000000000000000000059ce4a2ac5bc3f5f225439b2993b86b42f6d3e9f"
    );

    expect(
      expectedLiquidationEvents.length,
      "no expected liquidation"
    ).to.be.above(0);
    expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(
      expectedLiquidationEvents.length
    );

    const afterLiquidationBalance = BigNumber.from(
      await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
    console.log(
      `Profit :`,
      utils.formatEther(profit),
      "ETH"
    );

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    console.log("--------------------------------------------------");
  });

  /// 10000 USDT Liquidation

  it("Using :", async function () {
    console.log("\n\n---------- liquidation by using 10,000 USDT ----------");
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            jsonRpcUrl: process.env.ALCHE_API,
            blockNumber: 12489619,
          },
        },
      ],
    });

    const gasPrice = 0;
    const debt = 10000;
    const usdtValue = ethers.utils.parseUnits(debt.toString(), 6);
    const accounts = await ethers.getSigners();

    const LiquidationOperator = await ethers.getContractFactory(
      "LiquidationOperator_problem2"
    );
    const liquidationOperator = await LiquidationOperator.deploy(
      (overrides = { gasPrice: gasPrice })
    );
    await liquidationOperator.deployed();

    const liquidationTx = await liquidationOperator.operate(
      usdtValue,
      (overrides = { gasPrice: gasPrice })
    );
    const liquidationReceipt = await liquidationTx.wait();

    const liquidationEvents = liquidationReceipt.logs.filter(
      (v) =>
        v &&
        v.topics &&
        v.address === "0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9" &&
        Array.isArray(v.topics) &&
        v.topics.length > 3 &&
        v.topics[0] ===
          "0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286"
    );

    const expectedLiquidationEvents = liquidationReceipt.logs.filter(
      (v) =>
        v.topics[3] ===
        "0x00000000000000000000000059ce4a2ac5bc3f5f225439b2993b86b42f6d3e9f"
    );

    expect(
      expectedLiquidationEvents.length,
      "no expected liquidation"
    ).to.be.above(0);
    expect(liquidationEvents.length, "unexpected liquidation").to.be.equal(
      expectedLiquidationEvents.length
    );

    const afterLiquidationBalance = BigNumber.from(
      await hre.network.provider.request({
        method: "eth_getBalance",
        params: [liquidator],
      })
    );

    const profit = afterLiquidationBalance.sub(beforeLiquidationBalance);
    console.log(
      `Profit :`,
      utils.formatEther(profit),
      "ETH"
    );

    expect(profit.gt(BigNumber.from(0)), "not profitable").to.be.true;
    console.log("--------------------------------------------------");
  });
});
