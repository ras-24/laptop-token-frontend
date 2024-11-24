# laptop-token-frontend
Laptop Token ERC-20 Frontend

### Features
1. **Mint tokens** to increase their balance.
2. **Burn tokens** to decrease their balance.
3. **Check their token balance** directly from the blockchain.

## Getting Started
This is an example of how you can set up this project locally. To get a local copy up and running, follow these steps.

### Prerequisites
1. You must have a MetaMask Wallet Account.
2. We use Arbitrum Sepolia Testnet so we need to use a Arbitrum faucet to obtain test ether.
Make sure you have MetaMask balance on Arbitrum Sepolia Testnet Network.

### Installation
1. Clone the repo
   ```sh
   git clone https://github.com/ras-24/laptop-token-frontend.git
   ```
2. Go to laptop token frontend directory
   ```sh
   cd laptop-token-frontend
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. On app/ABI.json file, please change the JSON file with your own ABI code from your smart contract deployment.
   ```sh
    [YOUR_ABI]
   ```
5. On app/contract.ts file, please change **contractAddress** value with your deployed contract address.
   ```sh
   ...
   const contractAddress = "YOUR_CONTRACT_ADDRESS"; // Change with your Contract Address
   ...
   ```
6. Run project
   ```sh
    npm run start
   ```

## License

Distributed under the MIT License. See `LICENSE` for more information.
