import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const exercises = [
  { path: "/ex1", num: "01", title: "Somme de deux variables", desc: "view & pure functions, variables d'état" },
  { path: "/ex2", num: "02", title: "Conversion des cryptomonnaies", desc: "Ether ↔ Wei, pure functions" },
  { path: "/ex3", num: "03", title: "Traitement des chaînes", desc: "string, concat, compare, longueur" },
  { path: "/ex4", num: "04", title: "Tester le signe d'un nombre", desc: "int, conditions, booléen" },
  { path: "/ex5", num: "05", title: "Tester la parité d'un nombre", desc: "Modulo, pair/impair" },
  { path: "/ex6", num: "06", title: "Gestion des tableaux", desc: "uint[], push, require, boucles" },
  { path: "/ex7", num: "07", title: "Formes géométriques (POO)", desc: "abstract, héritage, override" },
  { path: "/ex8", num: "08", title: "Variables globales msg.sender & msg.value", desc: "payable, transfer, address" },
];

export default function Home() {
  return (
    <div className="home">
      <div className="home-bg" />
      <header className="home-header">
        <div className="home-header-inner">
          <h1 className="home-title">Projet de Fin de Module</h1>
          <p className="home-subtitle">Développement d'une dApp pour le TP 3</p>
          <p className="home-tech">Solidity · Truffle · ReactJS · Web3.js</p>
        </div>
      </header>

      <main className="home-main">
        <div className="exercises-grid">
          {exercises.map((ex) => (
            <Link key={ex.path} to={ex.path} className="ex-card">
              <span className="ex-num">{ex.num}</span>
              <div className="ex-content">
                <span className="ex-title">{ex.title}</span>
                <span className="ex-desc">{ex.desc}</span>
              </div>
              <span className="ex-arrow">→</span>
            </Link>
          ))}
        </div>
      </main>


    </div>
  );
}
