const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsSelected.js")

router.get("/", async (req, res)=> {   
    res.json({ status: "Received" });
});    

router.post('/', async (req, res) => {
    const { title, description } = req.body;
    const task = new itemsSelected({title, description});
    await task.save();
    res.json({status: 'itemsSelected Saved'});
  });
    

module.exports = router;