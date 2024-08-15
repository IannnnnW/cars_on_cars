const  Pool = require('./pool')
const dotenv = require("dotenv")
dotenv.config

const cars = [
    { brand: 'Tesla', model: 'Model S', year: 2022, car_asset: '/car-assets/tesla-model-s.jpeg', category_asset:"/category-assets/electric.jpg", categories: ['Luxury', 'Electric'], doors: 4, color: 'Grey', engine: 670, description:"The Tesla Model S is a luxury electric sedan known for its sleek design, high performance, and long-range capabilities. It offers advanced features like Autopilot, a minimalist interior with a large touchscreen, and rapid acceleration. The Model S is designed for both efficiency and speed, making it one of the most popular electric vehicles on the market." },
    { brand: 'BMW', model: 'X5', year: 2023, car_asset: '/car-assets/bmw-x5.jpeg', category_asset:"/category-assets/luxury.jpg", categories: ['Luxury', 'SUV'], doors: 4, color: 'Blue', engine: 617, description:"The BMW X5 is a luxury midsize SUV that combines sporty performance with a spacious and premium interior. Known for its powerful engine options, advanced technology, and smooth handling, the X5 offers a comfortable ride with the versatility of all-wheel drive and ample cargo space. It's a popular choice for those seeking a blend of luxury, practicality, and driving excitement." },
    { brand: 'Porsche', model: '911', year: 2023, car_asset: '/car-assets/porsche-911.jpeg', category_asset:"/category-assets/sports.jpg", categories: ['Sports', 'Luxury'], doors: 4, color: 'Grey', engine: 443, description:"The Porsche 911 is an iconic sports car renowned for its timeless design, rear-engine layout, and exhilarating performance. It offers a perfect blend of precision handling, powerful engines, and luxurious interiors. Known for its agility and driving pleasure, the 911 remains a symbol of automotive excellence and heritage, appealing to enthusiasts and those seeking a thrilling driving experience." },
    { brand: 'Toyota', model: 'RAV4', year: 2022, car_asset: '/car-assets/toyota-rav4.jpeg', category_asset:"/category-assets/suv.jpg", categories: ['SUV'], doors: 4, color: 'Sky Blue', engine: 203, description:"The 2023 Toyota RAV4 is a compact SUV known for its reliability, fuel efficiency, and versatile design. It offers a comfortable ride with a spacious interior, modern technology features, and multiple engine options, including a hybrid. The RAV4 is a popular choice for families and individuals looking for a practical and dependable vehicle with off-road capability and a stylish, rugged appearance." },
    { brand: 'Ford', model: 'Mustang Mach-E', year: 2023, car_asset: '/car-assets/ford-mach-e.jpeg', category_asset:"/category-assets/suv.jpg", categories: ['Electric', 'SUV'], doors: 4, color: 'Yellow', engine: 480, description:"The Mustang Mach-E is Ford's all-electric SUV that blends the iconic Mustang heritage with modern, eco-friendly technology. It features a sleek, sporty design, impressive acceleration, and a spacious, tech-filled interior. With various range options and all-wheel-drive capability, the Mach-E offers a thrilling driving experience while delivering the benefits of electric mobility. It's a bold step into the electric future for the Mustang brand." }
];

async function populateDatabase() {
    const client = await Pool.connect();
  
    try {
      await client.query('BEGIN');
      
     for( const car of cars){
      for(const category of car.categories){
        await client.query(`
        INSERT INTO categories (name, asset)
        SELECT $1::varchar, $2::varchar
        WHERE NOT EXISTS (
        SELECT 1 FROM categories WHERE name = $1::varchar
        )`, [category, car.category_asset])
      }
     }

      for (const car of cars) {
        // Insert car
        const carResult = await client.query(
          'INSERT INTO cars (brand, model, year, asset, doors, color, engine, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
          [car.brand, car.model, car.year, car.car_asset, car.doors, car.color, car.engine, car.description]
        );
        const carId = carResult.rows[0].id;
  
        // Insert car categories
        for (const category of car.categories) {
          const categoryResult = await client.query(
            'SELECT id FROM categories WHERE name = $1',
            [category]
          );
          const categoryId = categoryResult.rows[0].id;
  
          await client.query(
            'INSERT INTO car_categories (car_id, category_id) VALUES ($1, $2)',
            [carId, categoryId]
          );
        }
      }
  
      await client.query('COMMIT');
      console.log('Database populated successfully');
    } catch (e) {
      await client.query('ROLLBACK');
      console.error('Error populating database:', e);
    } finally {
      client.release();
    }
}

populateDatabase()