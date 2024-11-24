import Web3 from "web3";
import ABI from "./ABI.json";

let web3: Web3 | undefined;
let contract: any;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
  const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Change with your Contract Address
  contract = new (web3 as any).eth.Contract(ABI, contractAddress);
} else {
  console.log(
    "Ethereum wallet not detected. Please install MetaMask or another wallet."
  );
}

export { web3, contract };
