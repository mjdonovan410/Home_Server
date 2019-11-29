var express = require('express');
var router = express.Router();
const { pool } = require('../db_config');

router.get('/history', function(req, res, next) {
    //var yesterday = new Date();
    //yesterday.setTime(yesterday.getTime() - (24*60*60*1000)); //substracts 1 day
    //yesterday.toISOString().slice(0, 19).replace('T', ' '); 

    console.log("WAT")
    pool.query('SELECT * FROM temp_tracking WHERE area_id=$1 AND rec_dateTime>DATEADD(day,-1,NOW())', [1], (error,res1) => {
        if(error)
            console.log(error)
        else
            console.log(res1.rows[0])
    })
});

module.exports = router;
