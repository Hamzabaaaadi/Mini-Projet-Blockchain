import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import RectangleArtifact from "../contracts/Rectangle.json";

export default function Ex7() {
  const { contract, accounts, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(RectangleArtifact, "Rectangle");

  const [dx, setDx] = useState("");
  const [dy, setDy] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const call = async (label, fn) => {
    setBusy(true);
    try {
      const res = await fn();
      if (Array.isArray(res)) {
        setResult(`${label} → (${res.join(", ")})`);
      } else {
        setResult(`${label} → ${res}`);
      }
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleDeplacer = async () => {
    setBusy(true);
    try {
      const receipt = await contract.methods.deplacerForme(Number(dx), Number(dy)).send({ from: accounts[0] });
      setResult(`deplacerForme(${dx}, ${dy}) → Transaction envoyée`);
      setResultType("success");
      await refreshInfo(receipt, "deplacerForme");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 7 : POO — Forme & Rectangle</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">Fonctions héritées de Forme</div>
              <div className="btn-group" style={{ marginBottom: 16 }}>
                <button className="btn btn-secondary" onClick={() => call("afficheXY()", () => contract.methods.afficheXY().call())} disabled={busy}>afficheXY()</button>
                <button className="btn btn-secondary" onClick={() => call("afficheInfos()", () => contract.methods.afficheInfos().call())} disabled={busy}>afficheInfos()</button>
                <button className="btn btn-secondary" onClick={() => call("surface()", () => contract.methods.surface().call())} disabled={busy}>surface()</button>
              </div>

              <div className="card-title">deplacerForme(dx, dy)</div>
              <div style={{ display: 'flex', gap: 12 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>dx</label>
                  <input className="form-input" type="number" min="0" placeholder="0" value={dx} onChange={e => setDx(e.target.value)} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>dy</label>
                  <input className="form-input" type="number" min="0" placeholder="0" value={dy} onChange={e => setDy(e.target.value)} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={handleDeplacer} disabled={busy || !dx || !dy}>
                {busy ? <span className="loading" /> : null} Déplacer
              </button>
            </div>

            <div className="card">
              <div className="card-title">Fonctions propres au Rectangle</div>
              <div className="btn-group">
                <button className="btn btn-success" onClick={() => call("afficheLoLa()", () => contract.methods.afficheLoLa().call())} disabled={busy}>afficheLoLa()</button>
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
