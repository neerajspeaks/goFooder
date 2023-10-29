const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://<password>:<password>@gofooder.efzwlwg.mongodb.net/gofooder1?retryWrites=true&w=majority';

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log('Connected to Mongo DB successfully.....');

    try {
        const foodItemData = await mongoose.connection.db.collection('food_items');
        global.food_items = await foodItemData.find({}).toArray();

        const foodCategoryData = await mongoose.connection.db.collection('food_category');
        global.food_category = await foodCategoryData.find({}).toArray();
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToMongo;
