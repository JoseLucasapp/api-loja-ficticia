import { getProductById, getProducts, updateProducts, deleteProducts, createProduct } from "../controllers/products"

module.exports = (router) => {
    router.post('/products', createProduct)
    router.get('/products', getProducts)
    router.get('/products/:id', getProductById)
    router.put('/products/:id', updateProducts)
    router.deleteProducts('/products/:id', deleteProducts)
}