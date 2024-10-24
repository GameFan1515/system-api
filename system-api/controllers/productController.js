const { Product } = require('../models/product');


const addProduct = async (req, res) => {
    console.log('Requisição para adicionar produto recebida:', req.body);
    try {
        const { name, price, description } = req.body;

       
        if (!name || !price) {
            return res.status(400).json({ message: 'Nome e preço são obrigatórios.' });
        }

       
        const product = await Product.create({ name, price, description });
        console.log('Produto adicionado com sucesso:', product);

        return res.status(201).json(product);
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        return res.status(500).json({ message: 'Erro ao adicionar produto.' });
    }
};


const listProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (error) {
        console.error('Erro ao listar produtos:', error);
        return res.status(500).json({ message: 'Erro ao listar produtos.' });
    }
};


const updateProduct = async (req, res) => {
    const { id } = req.params; 
    const { name, price, description } = req.body; 

    try {
       
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

       
        if (name) product.name = name; 
        if (price) product.price = price; 
        if (description) product.description = description; 

        
        await product.save();
        console.log('Produto atualizado com sucesso:', product);
        res.json(product);
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        res.status(500).json({ message: 'Erro ao atualizar produto.' });
    }
};


const deleteProduct = async (req, res) => {
    const { id } = req.params; 

    try {
       
        const deletedCount = await Product.destroy({ where: { id } });
        if (deletedCount === 0) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }
        console.log('Produto deletado com sucesso.');
        res.json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        res.status(500).json({ message: 'Erro ao deletar produto.' });
    }
};

module.exports = {
    addProduct,
    listProducts,
    updateProduct,
    deleteProduct
};
