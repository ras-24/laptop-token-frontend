"use client";
import { useState } from "react";
import { web3, contract } from "./contract";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [mintAmount, setMintAmount] = useState<number | null>(null);
  const [burnAmount, setBurnAmount] = useState<number | null>(null);
  const [status, setStatus] = useState<string>("");
  const [balance, setBalance] = useState<string | null>(null);

  const connectWallet = async () => {
    if (web3 && contract) {
      try {
        const accounts = await web3.eth.requestAccounts();
        setAccount(accounts[0]);
        await loadAccountAndBalance();
      } catch (error) {
        console.error("Error accessing accounts:", error);
      }
    } else {
      console.error("Web3 or contract is not initialized");
    }
  };

  const loadAccountAndBalance = async () => {
    try {
      const accounts = await web3?.eth.requestAccounts();
      const userAccount = accounts ? accounts[0] : null;
      setAccount(userAccount);

      if (contract && userAccount) {
        const tokenBalance = await contract.methods
          .balanceOf(userAccount)
          .call();
        const decimals = await contract.methods.decimals().call();

        const balanceInBigInt = BigInt(tokenBalance);
        const decimalsInBigInt = BigInt(decimals);

        const humanReadableBalance =
          balanceInBigInt / bigIntPow(BigInt(10), decimalsInBigInt);
        setBalance(humanReadableBalance.toString());
      }
    } catch (error) {
      console.error("Error fetching account or balance:", error);
    }
  };

  const bigIntPow = (base: bigint, exponent: bigint): bigint => {
    let result = BigInt(1);
    for (let i = BigInt(0); i < exponent; i++) {
      result *= base;
    }
    return result;
  };

  const mintTokens = async () => {
    if (!mintAmount || mintAmount <= 0) {
      setStatus("Please enter a valid mint amount.");
      return;
    }

    try {
      setStatus("Minting in progress...");

      await contract.methods.mint(mintAmount).send({ from: account });

      setStatus("Tokens minted successfully!");
      setMintAmount(null);
      await loadAccountAndBalance();
    } catch (error) {
      console.error("Error minting tokens:", error);
      setStatus(
        "Failed to mint tokens. Please check the console for more details."
      );
    }
  };

  const burnTokens = async () => {
    if (!burnAmount || burnAmount <= 0) {
      setStatus("Please enter a valid burn amount.");
      return;
    }

    try {
      setStatus("Burning in progress...");

      await contract.methods.burn(burnAmount).send({ from: account });

      setStatus("Tokens burned successfully!");
      setBurnAmount(null);
      await loadAccountAndBalance();
    } catch (error) {
      console.error("Error burning tokens:", error);
      setStatus(
        "Failed to burn tokens. Please check the console for more details."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">Laptop Token</h1>
          <div className="mt-2 md:mt-0 flex flex-col items-center md:items-end">
            {/* Connected Account */}
            <p className="bg-gray-800 text-green-400 px-4 py-2 rounded-full text-sm font-mono overflow-hidden text-ellipsis w-full md:w-auto">
              Connected Account: {account || "No Account"}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          {/* Status */}
          {status && (
            <p
              className={`mt-2 text-sm font-semibold ${
                status.startsWith("Error") ? "text-red-500" : "text-green-500"
              }`}
            >
              {status}
            </p>
          )}
        </div>
      </header>

      {/* Content */}
      {!account ? (
        <div className="flex flex-col lg:flex-row gap-[30px] mt-[20px] px-[30px] min-h-[80vh] justify-center items-center">
          <button
            onClick={connectWallet}
            className="bg-black text-white py-2 px-4 rounded-full hover:opacity-90 transition"
          >
            Connect Wallet
          </button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Section: Mint and Burn */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              {/* Mint Section */}
              <div className="mb-8">
                <h2 className="text-lg font-bold mb-4">Mint Token</h2>
                <input
                  type="number"
                  placeholder="Amount"
                  value={mintAmount || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setMintAmount(Number(e.target.value) || 0)
                  }
                  className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 bg-gray-100"
                />
                <button
                  onClick={mintTokens}
                  className="w-full bg-black text-white py-2 rounded-full hover:opacity-90 transition"
                >
                  Mint Token
                </button>
              </div>

              {/* Burn Section */}
              <div>
                <h2 className="text-lg font-bold mb-4">Burn Token</h2>
                <input
                  type="number"
                  placeholder="Amount"
                  value={burnAmount || ""}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setBurnAmount(Number(e.target.value) || 0)
                  }
                  className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300 bg-gray-100"
                />
                <button
                  onClick={burnTokens}
                  className="w-full bg-black text-white py-2 rounded-full hover:opacity-90 transition"
                >
                  Burn Token
                </button>
              </div>
            </div>

            {/* Right Section: Token Balance */}
            <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
              <h2 className="text-lg font-bold mb-4">Your Token Balance</h2>
              <p className="text-4xl font-semibold mb-4">
                {balance || "Loading..."}
              </p>
              <hr className="w-full border-gray-300" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
