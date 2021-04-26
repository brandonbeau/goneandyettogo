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
            author: '6074c1392779eb1df8764fe3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, doloribus labore incidunt voluptates pariatur odio porro voluptatem autem odit mollitia iure quisquam magnam eligendi! Veniam numquam debitis totam necessitatibus doloremque!',
            price, 
            images: [
                {
                  url: 'https://res.cloudinary.com/dspicgd49/image/upload/v1619285455/gonengo/byziqmrrkjw40haota5v.jpg',
                  filename: 'gonengo/byziqmrrkjw40haota5v'
                },
                {

                  url: 'https://res.cloudinary.com/dspicgd49/image/upload/v1619285455/gonengo/rbr2s2ckbba6nas82efw.jpg',
                  filename: 'gonengo/rbr2s2ckbba6nas82efw'
                }
              ]
        })
        await dest.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})