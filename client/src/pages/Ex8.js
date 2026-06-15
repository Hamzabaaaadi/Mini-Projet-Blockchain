import React, { useState } from "react";
import { Link } from "react-router-dom";
import BlockchainInfo from "../components/BlockchainInfo";
import useContract from "../components/useContract";
import PaymentArtifact from "../contracts/Payment.json";

export default function Ex8() {
  const { web3, contract, accounts, blockchainInfo, txList, error, loading, refreshInfo } =
    useContract(PaymentArtifact, "Payment");

  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [resultType, setResultType] = useState("info");
  const [busy, setBusy] = useState(false);

  const handleReceive = async () => {
    if (!contract || !web3) return;
    setBusy(true);
    try {
      const weiValue = web3.utils.toWei(amount, "ether");
      const receipt = await contract.methods.receivePayment().send({ from: accounts[0], value: weiValue });
      setResult(`receivePayment() → ${amount} ETH reçu. Tx: ${receipt.transactionHash}`);
      setResultType("success");
      await refreshInfo(receipt, "receivePayment");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleWithdraw = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const receipt = await contract.methods.withdraw().send({ from: accounts[0] });
      setResult(`withdraw() → Fonds transférés au destinataire. Tx: ${receipt.transactionHash}`);
      setResultType("success");
      await refreshInfo(receipt, "withdraw");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleGetBalance = async () => {
    if (!contract || !web3) return;
    setBusy(true);
    try {
      const bal = await contract.methods.getBalance().call();
      const ethBal = web3.utils.fromWei(bal, "ether");
      setResult(`getBalance() → ${bal} Wei (${ethBal} ETH)`);
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  const handleGetRecipient = async () => {
    if (!contract) return;
    setBusy(true);
    try {
      const rec = await contract.methods.recipient().call();
      setResult(`recipient() → ${rec}`);
      setResultType("success");
    } catch (e) { setResult("Erreur: " + e.message); setResultType("error"); }
    setBusy(false);
  };

  return (
    <div className="page">
      <div className="page-header">
        <Link to="/" className="back-link">← Sommaire</Link>
        <h1>Exercice 8 : msg.sender & msg.value — Payment</h1>
      </div>
      <div className="page-body">
        {error && <div className="error-banner">{error}</div>}
        {loading ? <div className="card"><span className="loading" /> Connexion...</div> : (
          <>
            <div className="card">
              <div className="card-title">receivePayment() — payable</div>
              <div className="form-group">
                <label>Montant en Ether à envoyer</label>
                <input className="form-input" type="number" step="0.001" placeholder="ex: 0.5" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <button className="btn btn-success" onClick={handleReceive} disabled={busy || !amount}>
                {busy ? <span className="loading" /> : null} Envoyer des ETH
              </button>
            </div>

            <div className="card">
              <div className="card-title">withdraw() / getBalance() / recipient()</div>
              <div className="btn-group">
                <button className="btn btn-warning" onClick={handleWithdraw} disabled={busy}>withdraw()</button>
                <button className="btn btn-secondary" onClick={handleGetBalance} disabled={busy}>getBalance()</button>
                <button className="btn btn-secondary" onClick={handleGetRecipient} disabled={busy}>recipient()</button>
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
