const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authenticateToken = require('../middlewares/authMiddlewares');
const { Product } = require('../models/product'); 


router.post('/', authenticateToken, productController.addProduct);


router.get('/', authenticateToken, productController.listProducts);

router.put('/products/:id', productController.updateProduct);

router.delete('/products/:id', productController.deleteProduct);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the product
 *         name:
 *           type: string
 *           description: The name of the product
 *         price:
 *           type: number
 *           description: The price of the product
 *         description:
 *           type: string
 *           description: The description of the product
 *       example:
 *         name: Sample Product
 *         price: 99.99
 *         description: A sample product description
 */

// Swagger documentation (omitido para brevidade)
// ...

module.exports = router;
