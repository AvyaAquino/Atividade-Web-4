const express = require('express');
const HistoricoController = require('../controllers/historicoController');
const ProductController = require('../controllers/productController');
const SupplierController = require('../controllers/supplierController');

const router = express.Router();

// Rotas para o histórico
router.post('/historico-compras', HistoricoController.criar);
router.get('/historico-compras', HistoricoController.listar);
router.get('/historico-compras/:id', HistoricoController.buscarPorId);
router.put('/historico-compras/:id', HistoricoController.atualizar);
router.delete('/historico-compras/:id', HistoricoController.deletar);

// Rotas de Produtos
router.post('/produtos', ProductController.criar);
router.get('/produtos', ProductController.listar);
router.get('/produtos/:id', ProductController.buscarPorId);
router.put('/produtos/:id', ProductController.atualizar);
router.delete('/produtos/:id', ProductController.deletar);

// Rotas de Fornecedores
router.post('/fornecedores', SupplierController.criar);
router.get('/fornecedores', SupplierController.listar);
router.get('/fornecedores/:id', SupplierController.buscarPorId);
router.put('/fornecedores/:id', SupplierController.atualizar);
router.delete('/fornecedores/:id', SupplierController.deletar);


module.exports = router;