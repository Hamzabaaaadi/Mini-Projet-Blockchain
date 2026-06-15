import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import GestionTableauArtifact from "../contracts/GestionTableau.json";

export default function Ex6() {
  const { contract, accounts, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(GestionTableauArtifact, "GestionTableau");

  const [newNum, setNewNum] = useState("");
  const [indexInput, setIndexInput] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const handleAjouter = async () => {
    setBusy(true);
    try {
      const receipt = await contract.methods.ajouterNombre(Number(newNum)).send({ from: accounts[0] });
      setResult(`ajouterNombre(${newNum}) → Transaction envoyée`);
      setResultType("success");
      await refreshInfo(receipt, "ajouterNombre");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleGetElement = async () => {
    setBusy(true);
    try {
      const res = await contract.methods.getElement(Number(indexInput)).call();
      setResult(`getElement(${indexInput}) → ${res}`);
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleAfficher = async () => {
    setBusy(true);
    try {
      const res = await contract.methods.afficheTableau().call();
      setResult(`afficheTableau() → [${res.join(", ")}]`);
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleSomme = async () => {
    setBusy(true);
    try {
      const res = await contract.methods.calculerSomme().call();
      setResult(`calculerSomme() → ${res}`);
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 6 : Gestion des tableaux</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">ajouterNombre(n)</div>
              <div className="form-group">
                <label>Nombre à ajouter au tableau</label>
                <input className="form-input" type="number" placeholder="ex: 42" value={newNum} onChange={e => setNewNum(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={handleAjouter} disabled={busy || !newNum}>
                {busy ? <span className="loading" /> : null} Ajouter
              </button>
            </div>

            <div className="card">
              <div className="card-title">getElement(index)</div>
              <div className="form-group">
                <label>Index</label>
                <input className="form-input" type="number" min="0" placeholder="ex: 0" value={indexInput} onChange={e => setIndexInput(e.target.value)} />
              </div>
              <button className="btn btn-secondary" onClick={handleGetElement} disabled={busy || indexInput === ""}>
                Obtenir l'élément
              </button>
            </div>

            <div className="card">
              <div className="card-title">afficheTableau / calculerSomme</div>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleAfficher} disabled={busy}>Afficher le tableau</button>
                <button className="btn btn-success" onClick={handleSomme} disabled={busy}>Calculer la somme</button>
              </div>
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
