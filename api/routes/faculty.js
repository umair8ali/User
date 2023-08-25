const express = require('express');     //Including Express

const router = express.Router();        //Creating Router from express

router.get('/', (req, res,next) => {
    res.status(200).json({
        msg:'This is faculty Get Request'       //When required data from database we use GET Request
    })
})

router.post('/', (req, res,next) => {
    res.status(200).json({
        msg:'This is faculty Post Request'       //Post Request means updating the data
    })
})

module.exports = router;