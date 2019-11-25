import React, { useState, useEffect } from 'react';
import TempWidget from './TempWidget'
import LEDWidget from './LEDWidget'

function Home(props) {
    const [deviceData, setData] = useState(null);
  
    useEffect(()=>{
        let deviceList = props.deviceList.slice();
        let devices = deviceList.map(device => {
            if(device.showOnHome){
                if(device.deviceType === "Temperature")
                    return <TempWidget sensor={device} key={device.id}/>;
                else if(device.deviceType === "LED") 
                    return <LEDWidget sensor={device} key={device.id}/>;
                else
                    return null
            }
        })
        setData(devices)
    }, [props.deviceList]);    
    
    return (
        <div className='homeCont'>
            { deviceData }
        </div>
    );
}

export default Home;
