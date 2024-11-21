import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Supplier from './components/Supplier';
import Historico from './components/Historico';

const App = () => {
  return (
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">Gestão de Compras</a>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link" to="/products">Produtos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/suppliers">Fornecedores</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/historico">Histórico de Compras</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/suppliers" element={<Supplier />} />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
