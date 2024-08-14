const { Router } = require("express")

const homeRouter = Router()
const getHomeController = require('../controllers/getHomePage')

homeRouter.get('/', getHomeController.returnHomePage)

module.exports = homeRouter