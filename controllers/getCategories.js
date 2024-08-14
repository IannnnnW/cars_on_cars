const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

module.exports.returnCategories = asyncHandler ( async (req, res) => {
    const categories = await db.getAllCategories()
    res.render("categories", {categories: categories})
})