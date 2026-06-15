import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import PariteArtifact from "../contracts/Parite.json";

export default function Ex5() {
  const { contract, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(PariteArtifact, "Parite");

  const [nombre, setNombre] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const handleCheck = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const pair = await contract.methods.estPair(Number(nombre)).call();
      setResult(`estPair(${nombre}) → ${pair ? `✓ ${nombre} est PAIR` : `✗ ${nombre} est IMPAIR`}`);
      setResultType(pair ? "success" : "error");
      await refreshInfo(null, null);
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 5 : Tester la parité d'un nombre</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">estPair(uint nombre)</div>
              <div className="form-group">
                <label>Nombre entier positif</label>
                <input className="form-input" type="number" min="0" placeholder="ex: 4, 7, 100" value={nombre} onChange={e => setNombre(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleCheck} disabled={busy || nombre === ""}>
                {busy ? <span className="loading" /> : null} Vérifier la parité
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
