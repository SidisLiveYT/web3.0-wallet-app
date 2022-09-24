import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const checkWalletConnected = async () => {
    try {
      if (!ethereum)
        return alert("Please Install MetaMask Extension to Connect Wallet");
      const accounts = await ethereum.request({
        method: "eth_accounts",
      });

      if (accounts?.length) setCurrentAccount(accounts?.[0]);
      else return alert("No Account has been Found from MetaMask");
    } catch (err) {
      console.log(err);
      throw new Error("No Ethereum Object has been found !!");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum)
        return alert("Please Install MetaMask Extension to Connect Wallet");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
      throw new Error("No Ethereum Object has been found !!");
    }
  };

  const sendTransaction = async () => {
    try {
      if (!ethereum)
        return alert("Please Install MetaMask Extension to Connect Wallet");
      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();

      const parseAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5200", // 2100 Wei (Ether Sub-Division Currency)
            value: parseAmount._hex, // have to send in Hex Decimal
          },
        ],
      });

      const transactionHash = await transactionContract.addToBlockChain(
        addressTo,
        parseAmount,
        message,
        keyword
      );

      setIsLoading(true);
      console.log("Loading Transaction hash : ", transactionHash);
      await transactionHash.wait();

      setIsLoading(false);
      console.log("Finished Transaction hash : ", transactionHash);

      const transactionCount = await transactionContract.getTransactionCount();

      setTransactionCount(transactionCount.toNumber());
    } catch (err) {
      console.log(err);
      throw new Error("No Ethereum Object has been found !!");
    }
  };

  useEffect(() => {
    checkWalletConnected();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        formData,
        setFormData,
        handleChange,
        sendTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
