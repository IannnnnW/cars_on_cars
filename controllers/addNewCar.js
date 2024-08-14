const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

module.exports.addNewCar = asyncHandler( async (req, res) => {
  const { brand, model, year, fileUpload, categories, description } = req.body
  const car = {brand, model, year: parseInt(year), asset: `/car-assets/${fileUpload}`, description}
  const carResult = await db.addNewCar(car)

  const car_id = carResult.rows[0].id

  for( const category_id of categories){
    await db.addNewCarCategory(car_id, category_id)
  }
  res.redirect('/cars')
})

module.exports.addCarForm = asyncHandler( async (req, res) => {
  const categories = await db.getAllCategories()
  res.render("addcarform", {categories: categories})
})
