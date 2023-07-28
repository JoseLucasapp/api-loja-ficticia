const productsSchema = require('../database/schemas/product')

const createProduct = async (req, res) => {
    try {
        const result = new productsSchema({ ...req.body })

        await result.save()

        res.status(201).json({ data: result })

    } catch (error) {
        res.status(500).json(error)
    }
}

const getProducts = async (req, res) => {
    try {


        const filter = {}

        const pageOptions = {
            page: parseInt(req.query.page) || 0,
            limit: parseInt(req.query.limit) || 10,
        }

        if (req.query.name) Object.assign(filter, { name: { $regex: req.query.name, $options: 'i' } })
        if (req.query.category) Object.assign(filter, { category: { $regex: req.query.category, $options: 'i' } })

        const totalEntries = await productsSchema.find(filter).count()
        const productsData = await productsSchema
            .find(filter)
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit)

        const data = {
            data: productsData,
            metadata: {
                pageNumber: pageOptions.page,
                pageSize: productsData.length,
                totalEntries: totalEntries,
                totalPages: Math.ceil(totalEntries / pageOptions.limit),
            },
        }

        res.status(200).json(data)

    } catch (error) {
        res.status(500).json(error)
    }
}

const getProductById = async (req, res) => {
    try {

        const product = await productsSchema.findOne({ _id: req.params.id })
        res.status(200).json({ data: product })

    } catch (error) {
        res.status(500).json(error)
    }
}

const updateProducts = async (req, res) => {
    try {
        await productsSchema.updateOne({ _id: req.params.id }, { $set: req.body }, { upsert: true, new: true })
        res.status(200).json({ message: 'Updated' })
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteProducts = async (req, res) => {
    try {
        await productsSchema.deleteOne({ _id: req.params.id })
        res.status(200).json({ message: 'Deleted' })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { createProduct, getProductById, getProducts, updateProducts, deleteProducts }