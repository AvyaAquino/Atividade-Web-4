const Products = require('../models/products');

class ProductController {
    static async criar(req, res) {
        try {
            const { nome, preco } = req.body;

            const product = await Products.create({
                nome,
                preco
            });

            return res.status(201).json(product);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async listar(req, res) {
        try {
            const products = await Products.findAll();

            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async buscarPorId(req, res) {
        try {
            const { id } = req.params;

            const product = await Products.findByPk(id);

            if (!product) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            return res.status(200).json(product);
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, preco } = req.body;

            const atualizado = await Products.update({
                nome,
                preco
            }, {
                where: { id }
            });

            if (!atualizado) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            return res.status(200).json({ message: 'Produto atualizado com sucesso' });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }

    static async deletar(req, res) {
        try {
            const { id } = req.params;

            const deletado = await Products.destroy({
                where: { id }
            });

            if (!deletado) {
                return res.status(404).json({ message: 'Produto não encontrado' });
            }

            return res.status(200).json({ message: 'Produto deletado com sucesso' });
        }
        catch (error) {
            return res.status(500).json(error.message);
        }
    }
}


module.exports = ProductController;