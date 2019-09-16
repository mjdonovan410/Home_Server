var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/devices', function(req, res, next) {
    fs.readFile("public/files/devices.json", function(err,data){
        if(err === null){
            console.log('Loaded Devices from File')
            res.setHeader('Content-Type', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.end(data);
        }else{
            console.log(err)
            res.send('Failed to load devices');
        }        
    })
    
});

router.post('/devices', function(req, res, next) {
    res.send('API is working properly');
});

module.exports = router;