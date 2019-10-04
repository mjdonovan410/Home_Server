var express = require('express');
var fs = require('fs');
var router = express.Router();

router.get('/devices', function(req, res, next) {
    fs.readFile('public/files/devices.json', function(err, data) {
        if (err === null) {
            console.log('Loaded Devices from File');
            res.setHeader('Content-Type', 'application/json');
            res.setHeader(
                'Access-Control-Allow-Origin',
                '*'
            );
            res.end(data);
        } else {
            console.log(err);
            res.send('Failed to load devices');
        }
    });
});

router.post('/devices', function(req, res, next) {
    fs.writeFile('public/files/devices.json', JSON.stringify(req.body), function(err) {
        if(err === null){
            console.log('Updated Settings') 
            res.sendStatus(200)
        }
        else{
            console.log(err);
            res.sendStatus(500)
        }
    });
});

module.exports = router;
