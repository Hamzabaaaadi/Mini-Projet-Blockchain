import React from "react";

export default function BlockchainInfo({ info, txList }) {
  if (!info) return null;

  return (
    <div className="card" style={{ marginTop: 0 }}>
      <div className="card-title">Informations de la Blockchain</div>
      <div className="info-grid">
        <div className="info-section">
          <h3>Blockchain</h3>
          <div style={{ marginBottom: 12 }}>
            <div className="info-row"><span className="info-label">Infos du réseau :</span></div>
            <div className="info-row"><span className="info-label">URL :</span><span className="info-value accent">{info.network.url}</span></div>
            <div className="info-row"><span className="info-label">ID :</span><span className="info-value">{info.network.id}</span></div>
          </div>
          <div style={{ marginBottom: 12 }}>
            <div className="info-row"><span className="info-label">Infos du contrat :</span></div>
            <div className="info-row"><span className="info-label">Adresse :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{info.contract.address}</span></div>
            <div className="info-row"><span className="info-label">Compte :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{info.contract.account}</span></div>
          </div>
          <div>
            <div className="info-row"><span className="info-label">Dernier bloc :</span></div>
            <div className="info-row"><span className="info-label">N° :</span><span className="info-value accent">#{info.block.number}</span></div>
            <div className="info-row"><span className="info-label">Hash :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{info.block.hash}</span></div>
            <div className="info-row"><span className="info-label">Timestamp :</span><span className="info-value">{info.block.timestamp}</span></div>
            <div className="info-row"><span className="info-label">parentHash :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{info.block.parentHash}</span></div>
            <div className="info-row"><span className="info-label">nonce :</span><span className="info-value">{info.block.nonce}</span></div>
            <div className="info-row"><span className="info-label">transactions :</span><span className="info-value">{info.block.transactions}</span></div>
            <div className="info-row"><span className="info-label">miner :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{info.block.miner}</span></div>
            <div className="info-row"><span className="info-label">difficulty :</span><span className="info-value">{info.block.difficulty}</span></div>
            <div className="info-row"><span className="info-label">gasLimit :</span><span className="info-value">{info.block.gasLimit}</span></div>
            <div className="info-row"><span className="info-label">gasUsed :</span><span className="info-value">{info.block.gasUsed}</span></div>
            <div className="info-row"><span className="info-label">size :</span><span className="info-value">{info.block.size}</span></div>
          </div>
        </div>

        <div className="info-section">
          <h3>Transactions ({txList ? txList.length : 0})</h3>
          {txList && txList.length > 0 ? (
            txList.map((tx, i) => (
              <div key={i} style={{ marginBottom: 16, paddingBottom: 16, borderBottom: i < txList.length - 1 ? '1px solid var(--border)' : 'none' }}>
                <div className="info-row" style={{ marginBottom: 6 }}>
                  <span className="info-value" style={{ color: 'var(--accent2)', fontWeight: 700 }}>Transaction #{i + 1}</span>
                </div>
                <div className="info-row"><span className="info-label">Numéro :</span><span className="info-value">{i + 1}</span></div>
                <div className="info-row"><span className="info-label">Expéditeur :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{tx.from}</span></div>
                <div className="info-row"><span className="info-label">Destinataire :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{tx.to}</span></div>
                <div className="info-row"><span className="info-label">Hash :</span><span className="info-value" style={{ fontSize: '0.68rem' }}>{tx.hash}</span></div>
                <div className="info-row"><span className="info-label">Bloc :</span><span className="info-value">{tx.blockNumber}</span></div>
                <div className="info-row"><span className="info-label">Gas utilisé :</span><span className="info-value">{tx.gasUsed}</span></div>
                <div className="info-row"><span className="info-label">Statut :</span>
                  <span className={`info-value ${tx.status === 'Succès' ? 'green' : 'red'}`}>{tx.status}</span>
                </div>
                <div className="info-row"><span className="info-label">Contrat :</span><span className="info-value accent">{tx.contractName}</span></div>
                <div className="info-row"><span className="info-label">Fonction :</span><span className="info-value">{tx.functionName}</span></div>
              </div>
            ))
          ) : (
            <div className="info-row"><span className="info-value" style={{ color: 'var(--text3)' }}>Aucune transaction pour l'instant</span></div>
          )}
        </div>
      </div>
    </div>
  );
}
