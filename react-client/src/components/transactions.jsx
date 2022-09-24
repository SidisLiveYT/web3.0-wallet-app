import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import dummy from "../utils/dummyTransactions";
import fetchGifs from "../hooks/fetchGifs";

const shortenAccountAddress = (address) =>
  `${address.slice(0, 5)}....${address.slice(address.length - 7)}`;

const TransactionCard = async ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const gifUrl = await fetchGifs({ keyword: keyword });

  return (
    <div className="bg-[#1B1918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm:min-w-[270px] sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="w-full mb-6 p-2">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener no referer"
          >
            <p className="text-white text-base">
              From : {shortenAccountAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}}`}
            target="_blank"
            rel="noopener no referer"
          >
            <p className="text-white text-base">
              To : {shortenAccountAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">Amount : {amount}</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">Message : {message}</p>
            </>
          )}
        </div>{" "}
        <img
          src={gifUrl || url}
          alt="gif"
          className="w-full h-64 2x:h-96 rounded-md shadow-lg object-cover"
        />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

const transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">
            Latest Transactions
          </h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your MetaMask Account to See Latest Transactions
          </h3>
        )}
        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, index) => (
            <TransactionCard key={index} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default transactions;
