import React, { useEffect, useState } from "react";
import axios from "axios";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [newSupplier, setNewSupplier] = useState({ nome: "" });

  // Buscar fornecedores
  const fetchSuppliers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/fornecedores");
      setSuppliers(response.data);
    } catch (error) {
      console.error("Erro ao buscar fornecedores", error);
    }
  };

  // Adicionar fornecedor
  const addSupplier = async () => {
    try {
      await axios.post("http://localhost:3000/api/fornecedores", newSupplier);
      fetchSuppliers();
      setNewSupplier({ nome: "" });
    } catch (error) {
      console.error("Erro ao adicionar fornecedor", error);
    }
  };

  const editSupplier = async () => {
    try {
      await axios.put(
        `http://localhost:3000/api/fornecedores/${editingSupplier.id}`,
        editingSupplier
      );
      fetchSuppliers();
      setEditingSupplier(null);
    } catch (error) {
      console.error("Erro ao editar fornecedor", error);
    }
  }

  const deleteSupplier = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/fornecedores/${id}`);
      fetchSuppliers();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data.message);
      } else {
      console.error("Erro ao deletar fornecedor", error);
      }
    }
  }

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Fornecedores</h1>

      {/* Lista de Fornecedores */}
      <ul className="list-group mb-4">
        {suppliers.map((supplier) => (
          <li key={supplier.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {supplier.nome}
            </div>
            <div>
              <button
                className="btn btn-sm btn-primary me-2"
                onClick={() => setEditingSupplier(supplier)} // Abrir modo de edição
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteSupplier(supplier.id)} // Excluir fornecedor
              >
                Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Formulário para Adicionar Fornecedor */}
      <h2>Adicionar Fornecedor</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSupplier();
        }}
      >
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Nome do Fornecedor"
            value={newSupplier.nome}
            onChange={(e) => setNewSupplier({ ...newSupplier, nome: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar
        </button>
      </form>

      {/* Formulário para Atualizar Fornecedor */}
      {editingSupplier && (
        <div className="mt-4">
          <h2>Editar Fornecedor</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editSupplier(); // Atualizar fornecedor ao salvar
            }}
          >
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome do Fornecedor"
                value={editingSupplier.nome}
                onChange={(e) =>
                  setEditingSupplier({ ...editingSupplier, nome: e.target.value })
                }
              />
            </div>
            <button type="submit" className="btn btn-success">
              Salvar Alterações
            </button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => setEditingSupplier(null)} // Cancelar edição
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
export default Supplier;