import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import SigneArtifact from "../contracts/Signe.json";

export default function Ex4() {
  const { contract, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(SigneArtifact, "Signe");

  const [nombre, setNombre] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const handleCheck = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const res = await contract.methods.estPositif(Number(nombre)).call();
      setResult(`estPositif(${nombre}) → ${res ? "✓ POSITIF" : "✗ NON POSITIF (négatif ou zéro)"}`);
      setResultType(res ? "success" : "error");
      await refreshInfo(null, null);
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 4 : Tester le signe d'un nombre</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">estPositif(int nombre)</div>
              <div className="form-group">
                <label>Entier (positif, négatif ou zéro)</label>
                <input className="form-input" type="number" placeholder="ex: -5, 0, 42" value={nombre} onChange={e => setNombre(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleCheck} disabled={busy || nombre === ""}>
                {busy ? <span className="loading" /> : null} Vérifier le signe
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
