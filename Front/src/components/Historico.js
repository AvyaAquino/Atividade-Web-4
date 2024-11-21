import React, { useEffect, useState } from "react";
import axios from "axios";

const Historico = () => {
  const [historico, setHistorico] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [newEntry, setNewEntry] = useState({
    productId: "",
    supplierId: "",
    quantidade: 0,
    data: "",
  });


  // Função para buscar o histórico
  const fetchHistorico = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/historico-compras");
      setHistorico(response.data);
    } catch (error) {
      console.error("Erro ao buscar histórico", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/produtos");
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  }

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/fornecedores");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores", error);
    }
  }

  const addHistorico = async () => {
    try {
      await axios.post("http://localhost:3000/api/historico-compras", newEntry);
      fetchHistorico();
      setNewEntry({ productId: "", supplierId: "", quantidade: 0, data: "" });
    } catch (error) {
      console.error("Erro ao adicionar entrada no histórico", error);
    }
  }

  const deleteHistorico = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/historico-compras/${id}`);
      fetchHistorico();
    } catch (error) {
      console.error("Erro ao deletar entrada no histórico", error);
    }
  }

  useEffect(() => {
    fetchHistorico();
    fetchProducts();
    fetchSuppliers();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Histórico de Compras</h1>

      {/* Tabela de Histórico */}
      {historico.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Fornecedor</th>
              <th>Quantidade</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {historico.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.id}</td>
                <td>{entry.product?.nome || "Produto Desconhecido"}</td>
                <td>{entry.supplier?.nome || "Fornecedor Desconhecido"}</td>
                <td>{entry.quantidade}</td>
                <td>{new Date(entry.data).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteHistorico(entry.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Nenhum histórico de compras encontrado.</p>
      )}

      {/* Formulário para Adicionar Histórico */}
      <h2 className="mt-4">Adicionar Histórico de Compras</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addHistorico();
        }}
      >
        <div className="mb-3">
          <label htmlFor="productId" className="form-label">
            Produto
          </label>
          <select
            id="productId"
            className="form-select"
            value={newEntry.productId}
            onChange={(e) => setNewEntry({ ...newEntry, productId: e.target.value })}
          >
            <option value="">Selecione um Produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="supplierId" className="form-label">
            Fornecedor
          </label>
          <select
            id="supplierId"
            className="form-select"
            value={newEntry.supplierId}
            onChange={(e) => setNewEntry({ ...newEntry, supplierId: e.target.value })}
          >
            <option value="">Selecione um Fornecedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="quantidade" className="form-label">
            Quantidade
          </label>
          <input
            type="number"
            id="quantidade"
            className="form-control"
            value={newEntry.quantidade}
            onChange={(e) =>
              setNewEntry({ ...newEntry, quantidade: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="mb-3">
          <label htmlFor="data" className="form-label">
            Data
          </label>
          <input
            type="date"
            id="data"
            className="form-control"
            value={newEntry.data}
            onChange={(e) => setNewEntry({ ...newEntry, data: e.target.value })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Adicionar Histórico
        </button>
      </form>
    </div>
  );
};

export default Historico;
