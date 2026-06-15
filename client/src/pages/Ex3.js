import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import GestionChainesArtifact from "../contracts/GestionChaines.json";

export default function Ex3() {
  const { contract, accounts, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(GestionChainesArtifact, "GestionChaines");

  const [msg, setMsg] = useState("");
  const [s1, setS1] = useState("");
  const [s2, setS2] = useState("");
  const [s3, setS3] = useState("");
  const [s4, setS4] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const run = async (label, fn) => {
    setBusy(true);
    try {
      const res = await fn();
      setResult(`${label} → ${res}`);
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleSet = async () => {
    setBusy(true);
    try {
      const receipt = await contract.methods.setMessage(msg).send({ from: accounts[0] });
      setResult(`setMessage("${msg}") → Transaction envoyée`);
      setResultType("success");
      await refreshInfo(receipt, "setMessage");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 3 : Traitement des chaînes de caractères</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">setMessage / getMessage</div>
              <div className="form-group">
                <label>Message (variable d'état)</label>
                <input className="form-input" type="text" placeholder="ex: Solidity" value={msg} onChange={e => setMsg(e.target.value)} />
              </div>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={handleSet} disabled={busy || !msg}>Set Message</button>
                <button className="btn btn-secondary" onClick={() => run("getMessage()", () => contract.methods.getMessage().call())} disabled={busy}>Get Message</button>
              </div>
            </div>

            <div className="card">
              <div className="card-title">concatener / longueur / comparer</div>
              <div className="form-group">
                <label>Chaîne 1</label>
                <input className="form-input" type="text" placeholder="ex: Solidity" value={s1} onChange={e => setS1(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Chaîne 2</label>
                <input className="form-input" type="text" placeholder="ex: et ReactJS" value={s2} onChange={e => setS2(e.target.value)} />
              </div>
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => run(`concatener("${s1}","${s2}")`, () => contract.methods.concatener(s1, s2).call())} disabled={busy || !s1 || !s2}>Concaténer</button>
                <button className="btn btn-secondary" onClick={() => run(`comparer("${s1}","${s2}")`, () => contract.methods.comparer(s1, s2).call())} disabled={busy || !s1 || !s2}>Comparer</button>
                <button className="btn btn-warning" onClick={() => run(`longueur("${s1}")`, () => contract.methods.longueur(s1).call())} disabled={busy || !s1}>Longueur S1</button>
              </div>
            </div>

            <div className="card">
              <div className="card-title">concatenerAvec(autre)</div>
              <div className="form-group">
                <label>Autre chaîne (sera concaténée à message)</label>
                <input className="form-input" type="text" placeholder="ex:  World" value={s3} onChange={e => setS3(e.target.value)} />
              </div>
              <button className="btn btn-primary" onClick={() => run(`concatenerAvec("${s3}")`, () => contract.methods.concatenerAvec(s3).call())} disabled={busy || !s3}>
                concatenerAvec()
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
