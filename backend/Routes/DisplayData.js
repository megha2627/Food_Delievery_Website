const express = require("express")
const mongoose = require("mongoose")

const router = express.Router();
router.get('/foodData', (req, res) => {
    try {
        console.log('Food items:', global.food_items?.length);
        console.log('Food categories:', global.foodCategory?.length);
        res.send([global.food_items, global.foodCategory]);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

router.post('/foodData/add', async (req, res) => {
    try {
        const foodCollection = mongoose.connection.db.collection('food_items');
        await foodCollection.insertMany(req.body);
        res.status(200).send({ success: true, message: "Data inserted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, error: "Server Error" });
    }
});

module.exports = router;