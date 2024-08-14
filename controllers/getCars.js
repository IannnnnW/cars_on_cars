const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

module.exports.returnAllCars = asyncHandler( async (req, res) => {
    const cars = await db.getAllCars()
    res.render("cars", {cars: cars})
})