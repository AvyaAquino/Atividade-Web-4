const Supplier = require('../models/supplier');
const Historico = require('../models/historico');
const e = require('cors');

class SupplierController {
    static async criar(req, res) {
        try {
            const { nome } = req.body;

            const supplier = await Supplier.create({
                nome
            });

            return res.status(201).json(supplier);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json(error.message);
        }
    }

    static async listar(req, res) {
        try {
            const suppliers = await Supplier.findAll();

            return res.status(200).json(suppliers);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const supplier = await Supplier.findByPk(id);

            if (!supplier) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }

            return res.status(200).json(supplier);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            const atualizado = await Supplier.update({
                nome
            }, {
                where: { id }
            });

            if (!atualizado) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }

            return res.status(200).json({ message: 'Fornecedor atualizado com sucesso' });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;

            const historicos = await Historico.findOne({
                where: { supplierId: id }
            });

            if (historicos) {
                console.log(historicos);
                return res.status(400).json({ message: 'Fornecedor não pode ser deletado, pois está associado a um histórico' });
            }

            const deletado = await Supplier.destroy({
                where: { id }
            });

            if (!deletado) {
                return res.status(404).json({ message: 'Fornecedor não encontrado' });
            }

            return res.status(200).json({ message: 'Fornecedor deletado com sucesso' });
        }
        catch (error) {
            console.log(error)
            return res.status(500).json(error.message);
        }
    }
}

module.exports = SupplierController;

