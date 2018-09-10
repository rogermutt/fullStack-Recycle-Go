const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsInDB.js");

router.get("/", async (_, res)=> {  

    let today = await new Date ();
    
    await today.setDate(today.getDate() - 7);
    
    const last7Days = await itemsSelected.find({ "timestamp" :{ $gte: today }})

    res.json(last7Days);
});    

module.exports = router;