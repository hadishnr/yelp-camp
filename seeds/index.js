const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

main().catch((err) => console.log(err))

async function main() {
    await mongoose.connect('mongodb://localhost:27017/yelp-camp')
    console.log('Connection Open!!')
}

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '624d7620900cb7ac824d1abe',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxfdxjz6t/image/upload/v1649402251/YelpCamp/aujmdb3r3bja6xctrh0b',
                    filename: 'YelpCamp/aujmdb3r3bja6xctrh0b'
                },
                {
                    url: 'https://res.cloudinary.com/dxfdxjz6t/image/upload/v1649402253/YelpCamp/ek9nructgvx5iwjh5az6',
                    filename: 'YelpCamp/ek9nructgvx5iwjh5az6'
                }
            ]
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})
