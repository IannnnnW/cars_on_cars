const asyncHandler = require("express-async-handler")

module.exports.returnHomePage = (req, res) => {
    res.render("index")
}