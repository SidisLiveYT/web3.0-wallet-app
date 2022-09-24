require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.0",
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/lzEive6IDUn6ZLDLERYnDAuIUm0tFIt-",
      accounts: [
        "5e89bc012af67023475d6f336d9c6bd93cec74856d6f188b8c1f38acdf8426d3",
      ],
    },
  },
};
