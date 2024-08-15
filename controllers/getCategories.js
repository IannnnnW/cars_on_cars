const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

module.exports.returnCategories = asyncHandler ( async (req, res) => {
    const categories = await db.getAllCategories()
    res.render("categories", {categories: categories})
})

module.exports.returnCategoryCars = asyncHandler( async (req, res) => {
    const { carCategory } = req.params
    const cars = await db.getCarsByCategory(carCategory)
    res.render("categorycars", {carCategory, cars})
})