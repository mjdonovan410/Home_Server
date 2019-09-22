import React, { useState, useEffect } from 'react';
import TempWidget from './TempWidget'

function Home(props) {
    const [deviceData, setData] = useState(null);
  
    useEffect(()=>{
        let deviceList = props.deviceList.slice();
        let promises = deviceList.map(device => {
            return fetch("http://" + device.ipAddress + "/json")
                .then(res => res.json())
                .then(resJSON => {
                    //console.log(resJSON)
                    if(device.deviceType === "Temperature"){
                        device['temp'] = resJSON.temperature;
                        device['humid'] = resJSON.humidity;
                        return <TempWidget tempSensor={device} key={device.id}/>;
                    }
                });
        })
        Promise.all(promises).then(function(devices){
            setData(devices);
        });
    }, []);
    
    
    
    return (
        <div className='homeCont'>
            { deviceData }
        </div>
    );
}

export default Home;
