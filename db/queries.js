const Pool = require('./pool')

async function getAllCategories(){
    const { rows } = await Pool.query(`SELECT * FROM categories`);
    return rows
}

async function getAllCars(){
    const { rows } = await Pool.query(`SELECT * FROM cars`);
    return rows
}

async function getCarCategories(car_id){
    const { rows } = await Pool.query(
        `
        SELECT DISTINCT c.name 
        FROM categories c 
        JOIN car_categories cc ON c.id = cc.category_id 
        WHERE cc.car_id = $1 
        ORDER BY c.name
        `,[car_id])
    return rows
}

async function addNewCar(car){
    const carResult =  await Pool.query(
        `
        INSERT INTO cars (brand, model, year, asset, description)
        VALUES ($1, $2, $3, $4)
        RETURNING id
        `,[car.brand, car.model, car.year, car.asset, car.description])
    return carResult
}


async function addNewCarCategory(car_id, category_id){
    await Pool.query(`
        INSERT INTO car_categories 
        (car_id, category_id) 
        VALUES ($1, $2)
        `
        ,[car_id, category_id])
}
async function addNewCategory(category){
    await Pool.query(`
        INSERT INTO categories
        (name, asset)
        VALUES ($1, $2)
        `, [category.name, category.asset])
}

module.exports = {
    getAllCategories,
    getAllCars,
    getCarCategories,
    addNewCar,
    addNewCarCategory,
    addNewCategory
}