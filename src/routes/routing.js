const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsSelected.js")

router.get("/", async (req, res)=> {

    const items = await itemsSelected.find(function(err, items){ });
    console.log(items);
    
    res.json({ status: "Received" });
});    

module.exports = router;