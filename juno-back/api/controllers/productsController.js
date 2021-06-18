const Products = require('../../models/products')

exports.index = async (req, res) => {
    const items = await Products.findAll().then(res => res);

    return res.status(200).json(items)
}