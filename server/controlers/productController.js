import Product from '../models/ProductModel.js';
import asyncHandler from 'express-async-handler';

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});
// delete product
//@route  DELETE/api/products/:id
//@access Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})
// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.body.product.name,
        price: req.body.product.price,
        user: req.body.user._id,
        image: req.body.product.image,
        category: req.body.product.category,
        countInStock: req.body.product.countInStock,
        description: req.body.product.description,
    })

    const createdProduct = await product.save()
    res.status(201).json(product)
})


// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image, 
        gender,
        category,
        countInStock,
    } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.category = category
        product.gender = gender
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else { 
        res.status(404)
        throw new Error('Product not found')
    }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct }