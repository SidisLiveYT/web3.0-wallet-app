// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const main = async () => {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  const Transactions = await hre.ethers.getContractFactory("Transactions");
  const transactions = await Transactions.deploy();
  await transactions.deployed();

  console.log(
    `Lock with 1 ETH and unlock timestamp ${unlockTime} deployed to ${transactions.address}`
  );
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  ?.then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
