import React, { useState, useEffect } from 'react';
import TempWidget from './TempWidget'

function Home(props) {
    const [deviceData, setData] = useState(null);
  
    useEffect(()=>{
        let deviceList = props.deviceList.slice();
        let devices = deviceList.map(device => {
            if(device.showOnHome){
                if(device.deviceType === "Temperature")
                    return <TempWidget sensor={device} key={device.id}/>;
                else   
                    return <div></div>
            }
        })
        setData(devices)
    }, []);    
    
    return (
        <div className='homeCont'>
            { deviceData }
        </div>
    );
}

export default Home;
