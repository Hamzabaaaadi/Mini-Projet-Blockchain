import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ex1 from "./pages/Ex1";
import Ex2 from "./pages/Ex2";
import Ex3 from "./pages/Ex3";
import Ex4 from "./pages/Ex4";
import Ex5 from "./pages/Ex5";
import Ex6 from "./pages/Ex6";
import Ex7 from "./pages/Ex7";
import Ex8 from "./pages/Ex8";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ex1" element={<Ex1 />} />
        <Route path="/ex2" element={<Ex2 />} />
        <Route path="/ex3" element={<Ex3 />} />
        <Route path="/ex4" element={<Ex4 />} />
        <Route path="/ex5" element={<Ex5 />} />
        <Route path="/ex6" element={<Ex6 />} />
        <Route path="/ex7" element={<Ex7 />} />
        <Route path="/ex8" element={<Ex8 />} />
      </Routes>
    </Router>
  );
}

export default App;
