const { getProductById, getProducts, updateProducts, deleteProducts, createProduct } = require('../controllers/products')

module.exports = (router) => {
    router.post('/products', createProduct)
    router.get('/products', getProducts)
    router.get('/products/:id', getProductById)
    router.put('/products/:id', updateProducts)
    router.delete('/products/:id', deleteProducts)
}