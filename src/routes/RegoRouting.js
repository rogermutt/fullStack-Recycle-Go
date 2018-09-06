const express = require("express");
const router = express.Router();
const itemsSelected = require("../model/itemsSelected.js")
const RegisteredUsers = require("../model/RegisteredUsers.js")

router.get("/", async (req, res)=> {   
    const items = await itemsSelected.find();
    res.json(items);
});    

router.post('/', async (req, res) => {

    const { username, password } = req.body;

    const user = new RegisteredUsers({
        username: username,
        password: password
    });
    
    await user.save();    
    res.json({status: 'user Saved'});
});
    

module.exports = router;