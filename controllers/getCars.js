const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

module.exports.returnAllCars = asyncHandler( async (req, res) => {
    const cars = await db.getAllCars()
    res.render("cars", {cars: cars})
})

module.exports.returnCarInfo = asyncHandler(async (req, res)=> {
   const carId = req.params.carId
   const car = await db.getCarById(carId)
   const carCategories = await db.getCarCategories(carId)
   res.render("carinfo", {car: car[0], categories: carCategories})
})

module.exports.searchCars = asyncHandler( async (req, res) => {
    const { q } = req.query
    const searchResult = await db.searchCar(q)
    res.render("searchresult", {q:q, result: searchResult})
})