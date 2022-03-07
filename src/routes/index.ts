const express = require('express');
const router = express.Router();

router.get('/test', (req,res) => {
    console.log(req)
    res.json('HELLO WOLRD')
})

module.exports = router;