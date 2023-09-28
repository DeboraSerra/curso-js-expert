const faker = require('faker');
const { join } = require('path');

const Car = require('../src/entities/car')
const CarCategory = require('../src/entities/carCategory')
const Customer = require('../src/entities/custumer')

const seederBaseFolder = join(__dirname, "../", "database");
const { writeFile } = require('fs/promises')

const carCategory = new CarCategory({
  id: faker.random.uuid(),
  name: faker.vehicle.type(),
  carIds: [],
  price: faker.finance.amount(20, 100)
})

const cars = [];
const custumers = [];
for (let index = 0; index <= 2; index += 1) {
  const car = new Car({
    id: faker.random.uuid(),
    name: faker.vehicle.model(),
    available: true,
    gasAvailable: true,
    releaseYear: faker.date.past().getFullYear(),
  })
  carCategory.carIds.push(car.id)
  cars.push(car)
  const custumer = new Customer({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    age: faker.random.number({ min: 18, max: 50 })
  })
  custumers.push(custumer)
}

;(async () => {
  writeFile(`${seederBaseFolder}/cars.json`, JSON.stringify(cars))
  writeFile(`${seederBaseFolder}/custumers.json`, JSON.stringify(custumers))
  writeFile(`${seederBaseFolder}/carsCategories.json`, JSON.stringify([carCategory]))
})()