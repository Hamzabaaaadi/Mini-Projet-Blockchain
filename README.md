
Application décentralisée (dApp) pour interagir avec les 8 contrats Solidity du TP 3.

---

## 🗂️ Structure du projet

```
dapp-tp3/
│
├── contracts/                  # Contrats Solidity (Exercices 1–8)
│   ├── Migrations.sol
│   ├── Addition.sol            # Ex1 : Somme (view + pure)
│   ├── ConvertisseurCrypto.sol # Ex2 : Ether ↔ Wei
│   ├── GestionChaines.sol      # Ex3 : Chaînes de caractères
│   ├── Signe.sol               # Ex4 : Signe d'un nombre
│   ├── Parite.sol              # Ex5 : Parité
│   ├── GestionTableau.sol      # Ex6 : Tableaux dynamiques
│   ├── FormeRectangle.sol      # Ex7 : POO – abstract + héritage
│   └── Payment.sol             # Ex8 : msg.sender & msg.value
│
├── migrations/                 # Scripts de déploiement Truffle
│   ├── 1_initial_migration.js
│   └── 2_deploy_contracts.js
│
├── truffle-config.js           # Configuration Truffle (réseau Ganache)
├── package.json
│
└── client/                     # Frontend ReactJS
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js              # Router principal
    │   ├── index.js            # Point d'entrée
    │   ├── index.css           # Styles globaux
    │   ├── contracts/          # ABI générés par Truffle (auto)
    │   ├── components/
    │   │   ├── BlockchainInfo.js  # Composant info blockchain + transactions
    │   │   └── useContract.js     # Hook custom Web3 + chargement contrat
    │   ├── pages/
    │   │   ├── Home.js / Home.css # Page d'accueil avec menu
    │   │   ├── Ex1.js           # Addition (view + pure)
    │   │   ├── Ex2.js           # Convertisseur crypto
    │   │   ├── Ex3.js           # Chaînes de caractères
    │   │   ├── Ex4.js           # Signe d'un nombre
    │   │   ├── Ex5.js           # Parité
    │   │   ├── Ex6.js           # Gestion tableau
    │   │   ├── Ex7.js           # POO Rectangle
    │   │   └── Ex8.js           # Payment
    │   └── utils/
    │       └── web3Utils.js     # Helpers Web3 (info bloc, tx, etc.)
    └── package.json
```

---

## 🚀 Installation & Démarrage

### Prérequis
- Node.js v16+
- Truffle : `npm install -g truffle`
- Ganache (GUI ou CLI)
- MetaMask (optionnel)

### Étapes

```bash
# 1. Installer les dépendances Truffle
cd dapp-tp3
npm install

# 2. Lancer Ganache sur le port 7545 (réseau ID quelconque)

# 3. Compiler et déployer les contrats
truffle compile
truffle migrate --reset

# 4. Installer et lancer le frontend
cd client
npm install
npm start
# → http://localhost:3000
```

### Avec MetaMask
1. Ajouter un réseau personnalisé pointant vers `http://127.0.0.1:7545`
2. Importer un compte Ganache (clé privée)
3. L'app détecte automatiquement MetaMask

---

## 📋 Exercices couverts

| # | Titre | Concepts Solidity |
|---|-------|-------------------|
| 1 | Somme de deux variables | `view`, `pure`, variables d'état |
| 2 | Conversion Ether ↔ Wei | `pure`, unités (`1 ether`) |
| 3 | Gestion des chaînes | `string`, `string.concat`, `keccak256` |
| 4 | Signe d'un nombre | `int`, conditions, `bool` |
| 5 | Parité d'un nombre | modulo `%`, `bool` |
| 6 | Gestion de tableaux | `uint[]`, `push`, `require`, boucles |
| 7 | POO – Formes géométriques | `abstract`, héritage, `virtual`, `override` |
| 8 | Variables globales transactions | `payable`, `msg.sender`, `msg.value`, `transfer` |

---

## 🛠️ Technologies utilisées
- **Solidity 0.8.19** — Contrats intelligents
- **Truffle 5** — Compilation, migration, tests
- **Ganache** — Blockchain locale de développement
- **ReactJS 18** + **React Router 6** — Interface utilisateur
- **Web3.js 4** — Communication avec la blockchain
- **MetaMask** — Wallet (optionnel)
