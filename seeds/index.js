const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Destination = require('../models/destination');

mongoose.connect('mongodb://localhost:27017/gone-n-go', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Destination.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const dest = new Destination({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, doloribus labore incidunt voluptates pariatur odio porro voluptatem autem odit mollitia iure quisquam magnam eligendi! Veniam numquam debitis totam necessitatibus doloremque!',
            price
        })
        await dest.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})