const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://meghagupta270505:hello@cluster0.cydyo.mongodb.net/goFood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB successfully');
        
        const fetched_data = await mongoose.connection.db.collection('food_items');
        const foodData = await fetched_data.find({}).toArray();
        global.food_items = foodData;
        
        const foodCategory = await mongoose.connection.db.collection('food_category');
        const catData = await foodCategory.find({}).toArray();
        global.foodCategory = catData;
        
        console.log('Data loaded successfully');
        console.log('Food Items:', global.food_items.length);
        console.log('Categories:', global.foodCategory.length);
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
    }
}

module.exports = mongoDB;
