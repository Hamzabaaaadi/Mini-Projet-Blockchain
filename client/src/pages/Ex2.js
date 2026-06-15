import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import ConvertisseurCryptoArtifact from "../contracts/ConvertisseurCrypto.json";

export default function Ex2() {
  const { contract, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(ConvertisseurCryptoArtifact, "ConvertisseurCrypto");

  const [ether, setEther] = useState("");
  const [wei, setWei] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const handleEtherToWei = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const res = await contract.methods.etherEnWei(Number(ether)).call();
      setResult(`etherEnWei(${ether}) → ${res} Wei`);
      setResultType("success");
      await refreshInfo(null, null);
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleWeiToEther = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const res = await contract.methods.weiEnEther(wei).call();
      setResult(`weiEnEther(${wei}) → ${res} Ether`);
      setResultType("success");
      await refreshInfo(null, null);
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 2 : Conversion des cryptomonnaies</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">etherEnWei(montant)</div>
              <div className="form-group">
                <label>Montant en Ether</label>
                <input className="form-input" type="number" placeholder="ex: 2" value={ether} onChange={e => setEther(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleEtherToWei} disabled={busy || !ether}>
                {busy ? <span className="loading" /> : null} Convertir → Wei
              </button>
            </div>

            <div className="card">
              <div className="card-title">weiEnEther(montant)</div>
              <div className="form-group">
                <label>Montant en Wei</label>
                <input className="form-input" type="text" placeholder="ex: 2000000000000000000" value={wei} onChange={e => setWei(e.target.value)} />
              </div>
              <button className="btn btn-secondary" onClick={handleWeiToEther} disabled={busy || !wei}>
                {busy ? <span className="loading" /> : null} Convertir → Ether
              </button>
            </div>

            <div className="card">
              <div className="card-title">Résultat</div>
              <div className={`result-box ${resultType}`}>{result || "Le résultat s'affichera ici..."}</div>
            </div>

            <BlockchainInfo info={blockchainInfo} txList={txList} />
          </>
        )}
      </div>
    </div>
  );
}
