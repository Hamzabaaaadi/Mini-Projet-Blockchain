import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import AdditionArtifact from "../contracts/Addition.json";

export default function Ex1() {
  const { contract, accounts, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(AdditionArtifact, "Addition");

  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const handleAddition1 = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const receipt = await contract.methods.setNombres(Number(n1), Number(n2)).send({ from: accounts[0] });
      const sum = await contract.methods.addition1().call();
      setResult(`addition1() → ${sum}`);
      setResultType("success");
      await refreshInfo(receipt, "addition1");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleAddition2 = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const sum = await contract.methods.addition2(Number(a), Number(b)).call();
      setResult(`addition2(${a}, ${b}) → ${sum}`);
      setResultType("success");
      await refreshInfo(null, null);
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 1 : Somme de deux variables</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">addition1() — view (variables d'état)</div>
              <div className="form-group">
                <label>Nombre 1 (variable d'état)</label>
                <input className="form-input" type="number" placeholder="ex: 15" value={n1} onChange={e => setN1(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Nombre 2 (variable d'état)</label>
                <input className="form-input" type="number" placeholder="ex: 25" value={n2} onChange={e => setN2(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleAddition1} disabled={busy || !n1 || !n2}>
                {busy ? <span className="loading" /> : null} Calculer addition1()
              </button>
            </div>

            <div className="card">
              <div className="card-title">addition2(a, b) — pure (paramètres)</div>
              <div className="form-group">
                <label>Paramètre a</label>
                <input className="form-input" type="number" placeholder="ex: 10" value={a} onChange={e => setA(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Paramètre b</label>
                <input className="form-input" type="number" placeholder="ex: 30" value={b} onChange={e => setB(e.target.value)} />
              </div>
              <button className="btn btn-secondary" onClick={handleAddition2} disabled={busy || !a || !b}>
                {busy ? <span className="loading" /> : null} Calculer addition2()
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
