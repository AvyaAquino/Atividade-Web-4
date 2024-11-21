const { includes } = require('lodash');
const Historico = require('../models/historico');
const Products = require('../models/products');
const Supplier = require('../models/supplier');

class HistoricoController {
    static async criar(req, res) {
        try {
            const { productId, supplierId, quantidade, data } = req.body;

            const historico = await Historico.create({
                productId,
                supplierId,
                quantidade,
                data
            });

            return res.status(201).json(historico);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async listar(req, res) {
        try {
          const historico = await Historico.findAll({
            include: [Products, Supplier],
          });
    
          return res.status(200).json(historico);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        }
      }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const historico = await Historico.findByPk(id, {
                include: [Products, Supplier]
            });

            if (!historico) {
                return res.status(404).json({ message: 'Historico não encontrado' });
            }

            return res.status(200).json(historico);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { quantidade, data } = req.body;

            const atualizado = await Historico.update({
                quantidade,
                data
            }, {
                where: { id }
            });

            if (!atualizado) {
                return res.status(404).json({ message: 'Historico não encontrado' });
            }

            return res.status(200).json({ message: 'Historico atualizado com sucesso' });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;

            const deletado = await Historico.destroy({
                where: { id }
            });

            if (!deletado) {
                return res.status(404).json({ message: 'Historico não encontrado' });
            }

            return res.status(200).json({ message: 'Historico deletado com sucesso' });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}

module.exports = HistoricoController;

