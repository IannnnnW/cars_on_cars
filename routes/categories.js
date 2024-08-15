const { Router } = require("express")
const multer = require('multer')
const path = require('path')

const uploads = multer({
    storage: multer.diskStorage(
    {destination: function (req, file, cb) {
        cb(null, path.join('public', 'category-assets'));
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const nameWithoutExt = path.basename(file.originalname, ext);
        const uniqueName = `${nameWithoutExt}-${Date.now()}${ext}`;
        req.body.fileUpload = uniqueName
        cb(null, uniqueName);
    }}),

    fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and GIF are allowed.'), false);
    }},

    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB file size limit
    }
})

const categoryRouter = Router()
const getCategories = require('../controllers/getCategories')
const addCategory = require('../controllers/addNewCategory')

categoryRouter.get("/", getCategories.returnCategories)
categoryRouter.get("/addcategory", addCategory.createNewCategoryForm)
categoryRouter.post("/addcategory", uploads.single('category_asset'), addCategory.createNewCategory)
categoryRouter.get("/:carCategory", getCategories.returnCategoryCars)

module.exports = categoryRouter

