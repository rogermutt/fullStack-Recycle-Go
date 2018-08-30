const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsSelected.js")
const RegisteredUsers = require("../model/RegisteredUsers.js")

router.get("/", async (req, res)=> {   
    res.json({ status: "Received" });
});    

router.post('/', async (req, res) => {
    
    const { tasks } = req.body;

    const task = new itemsSelected({tasks});
    await task.save();
    res.json({status: 'itemsSelected Saved'});

});
    

module.exports = router;