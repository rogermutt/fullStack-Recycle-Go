const express = require("express");
const router = express.Router();
const itemsInDB = require("../model/itemsInDB.js")

router.get("/", async (req, res)=> {   
    const items = await itemsInDB.find();
    res.json(items);
});    

router.post('/', async (req, res) => {

    console.log("Router receives: ",req.body.itemsSelected);

    var date = new Date();
    var dateString = date.toString();
    
    const { itemsSelected } = req.body;
    const newitems = new itemsInDB({
        items: itemsSelected,
        timestamp: date
    });

    await newitems.save();
    res.json({status: 'itemsSelected Saved'});

});
    

module.exports = router;