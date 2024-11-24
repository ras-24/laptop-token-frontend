import Web3 from "web3";
import ABI from "./ABI.json";

let web3: Web3 | undefined;
let contract: any;
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  web3 = new Web3(window.ethereum);
  contract = new (web3 as any).eth.Contract(ABI, contractAddress);
} else {
  console.log(
    "Ethereum wallet not detected. Please install MetaMask or another wallet."
  );
}

export { web3, contract };
