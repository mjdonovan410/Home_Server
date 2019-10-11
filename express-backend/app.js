var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var fs = require('fs');
let fetch = require('node-fetch');

var indexRouter = require('./routes/index');
var devicesRouter = require('./routes/devices');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/', devicesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

function getTime(){
    var today = new Date();
    return ((today.getHours() < 10)?"0":"") + today.getHours() +":"+ ((today.getMinutes() < 10)?"0":"") + today.getMinutes() +":"+ ((today.getSeconds() < 10)?"0":"") + today.getSeconds();
}

let today = new Date();
let refreshRate = 5 //in minutes
let nextDataGrab = (refreshRate - today.getMinutes()%refreshRate)*60000 - (today.getSeconds()*1000);
//console.log(today.getMinutes()%refreshRate +":"+ today.getSeconds())
//console.log("Next update in " + (refreshRate-(today.getMinutes()%refreshRate)-1) + ":"+ (60 - today.getSeconds()))
//console.log(nextDataGrab)

// Grabs data from each readOnly device (i.e. Temp Sensors)
function grabDataFromDevices(){
    fs.readFile('public/files/devices.json', function(err, data) {
        if (err === null) {
            let jsonData = JSON.parse(data);
            let deviceList = [];
            let promises = jsonData.map(device => {
                if(device.readOnly){
                    console.log("Grabbing Data from "+device.ipAddress)
                    return fetch("http://"+device.ipAddress+"/json")
                    .then(res => res.json())
                    .then(resJSON => {
                        if(device.deviceType === "Temperature"){
                            device.temp = resJSON.temperature;
                            device.humid = resJSON.humidity;
                            device.updated = getTime();
                        }
                        deviceList.push(device)
                    })
                    .catch(err => {
                        console.log(err)
                        if(device.deviceType === "Temperature"){
                            device.temp = "#";
                            device.humid = "#";
                            device.updated = getTime();
                        }
                        
                        deviceList.push(device)
                    })
                }
                deviceList.push(device)
            })
            
            Promise.all(promises).then(()=>{
                fs.writeFile('public/files/devices.json', JSON.stringify(deviceList), function(err) {
                    if(err=== null)
                        console.log('Updated Settings') 
                    else
                        console.log(err);
                })
            })
        } else {
            console.log(err);
        }
    });
}

// Handles the irregular start time of the server.
// Runs the data grab from devices every 5 mins (5 is default but might change to 10)
setTimeout(()=>{
    grabDataFromDevices()
    setInterval(()=>{
        grabDataFromDevices()
    }, refreshRate*60000)
}, nextDataGrab)

module.exports = app;
