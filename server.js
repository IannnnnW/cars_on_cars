const express = require("express")
const path = require("path")
const app = express()

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.set("views", path.join(__dirname, 'views'))
app.set("view engine", "ejs")

const homeRouter = require('./routes/home')
const categoryRouter = require('./routes/categories')
const carRouter = require('./routes/cars')

app.use("/", homeRouter)
app.use("/categories", categoryRouter)
app.use("/cars", carRouter)

app.use((error, req, res, next) => {
    console.log(error)
    res.status(500).send(error.message)
})


const PORT = 3000
app.listen(PORT, ()=> console.log('Listening to requests on port :',PORT))