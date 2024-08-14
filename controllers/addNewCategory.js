const asyncHandler = require("express-async-handler")
const db = require("../db/queries")

module.exports.createNewCategoryForm = asyncHandler (async (req, res) => {
    res.render("addcategoryform")
})

module.exports.createNewCategory = asyncHandler (async (req, res) => {
    const {name, fileUpload} = req.body
    const category = {name,  asset:`/category-assets/${fileUpload}`}
    await db.addNewCategory(category)
    res.redirect("/categories")
})