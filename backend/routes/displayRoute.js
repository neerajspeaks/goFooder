const express = require('express');
const router = express.Router();

router.post('/fooddata', (req, res) => {
    try {
        res.send([global.food_items, food_category]);
    } catch (error) {
        console.log(error);
        res.send('Server Error');
    }
});

module.exports = router;