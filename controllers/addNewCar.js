const asyncHandler = require('express-async-handler')
const db = require('../db/queries')

module.exports.addNewCar = asyncHandler( async (req, res) => {
  const { brand, model, year, fileUpload, doors, categories, color, engine, description } = req.body
  const car = {brand, model, year:parseInt(year), asset:`/car-assets/${fileUpload}`, doors:parseInt(doors), color:color, engine: parseInt(engine),  description}
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

const car = `
{
  brand: 'Mercedes Benz',
  model: 'X Class',
  year: '2023',
  doors: '2',
  color: 'Grey',
  engine: '200',
  categories: '4',
  description: 'The 2023 Mercedes-Benz X-Class combines luxury and rugged utility in a refined pickup truck design. Featuring a robust and stylish exterior, the X-Class offers a commanding presence with its bold grille and sleek LED headlights. Under the hood, it boasts a range of powerful engine options, including a 3.0-liter V6 turbo diesel, delivering impressive performance both on and off the road. The interior is equally luxurious, with high-quality materials, advanced technology, and comfortable seating for up to five passengers. The X-Class comes equipped with a host of modern features such as an intuitive infotainment system, advanced safety technologies, and a versatile cargo area, making it a compelling choice for those who demand both sophistication and capability in their vehicle.',
  fileUpload: 'royce-ghost-1723733336117.jpg'
}
`