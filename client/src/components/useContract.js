import { useState, useEffect } from "react";
import Web3 from "web3";
import { getBlockchainInfo, formatTxInfo } from "../utils/web3Utils";

const GANACHE_URL = "http://127.0.0.1:7545";

export default function useContract(artifact, contractName) {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [blockchainInfo, setBlockchainInfo] = useState(null);
  const [txList, setTxList] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        let w3;
        if (window.ethereum) {
          w3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
        } else {
          w3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL));
        }

        let networkId = await w3.eth.net.getId();
        let deployed = artifact.networks[networkId];

        if (!deployed && window.ethereum) {
          const localWeb3 = new Web3(new Web3.providers.HttpProvider(GANACHE_URL));
          const localNetworkId = await localWeb3.eth.net.getId();
          const localDeployed = artifact.networks[localNetworkId];

          if (localDeployed) {
            w3 = localWeb3;
            networkId = localNetworkId;
            deployed = localDeployed;
          }
        }

        setWeb3(w3);

        if (!deployed) {
          const availableNetworks = Object.keys(artifact.networks || {}).join(", ") || "aucun";
          setError(
            `Contrat "${contractName}" non trouve sur le reseau ${networkId}. ` +
            `Reseaux disponibles: ${availableNetworks}. ` +
            `Ouvre Ganache sur ${GANACHE_URL}, puis lance: truffle migrate --reset`
          );
          setLoading(false);
          return;
        }

        const instance = new w3.eth.Contract(artifact.abi, deployed.address);
        setContract(instance);

        const accs = await w3.eth.getAccounts();
        setAccounts(accs);

        const info = await getBlockchainInfo(w3, instance);
        setBlockchainInfo(info);
      } catch (err) {
        setError("Erreur d'initialisation: " + err.message);
      }
      setLoading(false);
    };
    init();
  }, [artifact, contractName]);

  const refreshInfo = async (receipt, fnName) => {
    if (!web3 || !contract) return;
    const info = await getBlockchainInfo(web3, contract);
    setBlockchainInfo(info);
    if (receipt) {
      const tx = await formatTxInfo(web3, receipt, contractName, fnName);
      setTxList((prev) => [...prev, tx]);
    }
  };

  return { web3, contract, accounts, blockchainInfo, txList, error, loading, refreshInfo };
}
