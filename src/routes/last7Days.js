const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsInDB.js");

router.get("/", async (_, res)=> {  

    let _7daysAgo = await new Date ();
    
    await _7daysAgo.setDate(_7daysAgo.getDate() - 7);
    
    const last7Days = await itemsSelected.find({ "timestamp" :{ $gte: _7daysAgo }})

    res.json(last7Days);
});    

module.exports = router;