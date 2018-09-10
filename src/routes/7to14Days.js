const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsInDB.js");

router.get("/", async (_, res)=> {  

    let _7daysAgo = await new Date ();
    let _14daysAgo = await new Date ();
    
    await _7daysAgo.setDate(_7daysAgo.getDate() - 7);
    await _14daysAgo.setDate(_14daysAgo.getDate() - 14);

    const _7to14Days = await itemsSelected.find({ 
        $and: [ { timestamp: { $gte: _14daysAgo } }, { timestamp: { $lt: _7daysAgo } } ] 
    });

    res.json(_7to14Days);
});    

module.exports = router;