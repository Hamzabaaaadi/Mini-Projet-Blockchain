import Web3 from "web3";

let web3Instance = null;

export const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          web3Instance = web3;
          resolve(web3);
        } catch (error) {
          reject(error);
        }
      } else if (window.web3) {
        web3Instance = new Web3(window.web3.currentProvider);
        resolve(web3Instance);
      } else {
        // Fallback to Ganache local
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        web3Instance = new Web3(provider);
        resolve(web3Instance);
      }
    });
  });
};

export const getLocalWeb3 = () => {
  const provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
  return new Web3(provider);
};

export const loadContract = async (web3, artifact) => {
  const networkId = await web3.eth.net.getId();
  const deployedNetwork = artifact.networks[networkId];
  if (!deployedNetwork) {
    throw new Error(`Contrat non déployé sur le réseau ${networkId}. Lancez 'truffle migrate'.`);
  }
  return new web3.eth.Contract(artifact.abi, deployedNetwork.address);
};

export const getBlockchainInfo = async (web3, contract) => {
  const blockNumber = await web3.eth.getBlockNumber();
  const block = await web3.eth.getBlock(blockNumber);
  const accounts = await web3.eth.getAccounts();
  const networkId = await web3.eth.net.getId();
  const networkUrl = web3.currentProvider?.host || "HTTP://127.0.0.1:7545";

  return {
    network: { url: networkUrl, id: String(networkId) },
    contract: {
      address: contract?.options?.address || "N/A",
      account: accounts[0] || "N/A",
    },
    block: {
      number: String(blockNumber),
      hash: block?.hash || "N/A",
      timestamp: block?.timestamp
        ? new Date(Number(block.timestamp) * 1000).toLocaleString()
        : "N/A",
      parentHash: block?.parentHash || "N/A",
      nonce: block?.nonce || "N/A",
      transactions: String(block?.transactions?.length || 0),
      miner: block?.miner || "N/A",
      difficulty: String(block?.difficulty || 0),
      gasLimit: String(block?.gasLimit || 0),
      gasUsed: String(block?.gasUsed || 0),
      size: String(block?.size || 0),
    },
  };
};

export const formatTxInfo = async (web3, receipt, contractName, functionName) => {
  const accounts = await web3.eth.getAccounts();
  return {
    hash: receipt.transactionHash,
    from: receipt.from || accounts[0],
    to: receipt.to,
    blockNumber: String(receipt.blockNumber),
    gasUsed: receipt.gasUsed ? String(receipt.gasUsed) : "N/A",
    status: receipt.status ? "Succès" : "Échec",
    contractName,
    functionName,
  };
};
