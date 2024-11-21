import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [newProduct, setNewProduct] = useState({ nome: "", preco: 0 });

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/produtos");
            setProducts(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    }

    const addProduct = async () => {
        try {
            await axios.post("http://localhost:3000/api/produtos", newProduct);
            fetchProducts();
            setNewProduct({ nome: "", preco: 0 });
        } catch (error) {
            console.error("Erro ao adicionar produto", error);
        }
    }

    const editProduct = async () => {
      try {
        await axios.put(`http://localhost:3000/api/produtos/${editingProduct.id}`, editingProduct);
        fetchProducts();
        setEditingProduct(null);
      } catch (error) {
        console.error("Erro ao editar produto", error);
      }
    }

    const deleteProduct = async (id) => {
      try {
        await axios.delete(`http://localhost:3000/api/produtos/${id}`);
        fetchProducts();
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message)
        } else {
        console.error("Erro ao deletar produto", error);
        }
      }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
      <div className="container mt-4">
        <h1 className="mb-4">Produtos</h1>
  
        {/* Lista de Produtos */}
        <ul className="list-group mb-4">
          {products.map((product) => (
            <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                {product.nome} - R$ {product.preco.toFixed(2)}
              </div>
              <div>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => setEditingProduct(product)} // Abrir modo de edição
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
  
        {/* Formulário para Adicionar Produto */}
        <h2>Adicionar Produto</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addProduct();
          }}
        >
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nome do Produto"
              value={newProduct.nome}
              onChange={(e) => setNewProduct({ ...newProduct, nome: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <input
              type="number"
              className="form-control"
              placeholder="Preço do Produto"
              value={newProduct.preco}
              onChange={(e) => setNewProduct({ ...newProduct, preco: parseFloat(e.target.value) })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Adicionar
          </button>
        </form>
  
        {/* Formulário para Atualizar Produto */}
        {editingProduct && (
          <div className="mt-4">
            <h2>Editar Produto</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editProduct();
              }}
            >
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nome do Produto"
                  value={editingProduct.nome}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, nome: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  placeholder="Preço do Produto"
                  value={editingProduct.preco}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, preco: parseFloat(e.target.value) })
                  }
                />
              </div>
              <button type="submit" className="btn btn-success">
                Salvar Alterações
              </button>
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => setEditingProduct(null)} // Cancelar edição
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
      </div>
    );
  };

export default Products;