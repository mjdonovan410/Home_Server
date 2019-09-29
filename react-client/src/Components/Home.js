import React, { useState, useEffect } from 'react';
import TempWidget from './TempWidget'

function Home(props) {
    const [deviceData, setData] = useState(null);
  
    useEffect(()=>{
        let deviceList = props.deviceList.slice();
        let promises = deviceList.map(device => {
            if(device.deviceType === "Temperature")
                return <TempWidget sensor={device} key={device.id}/>;
            else   
                return <div></div>
        })
        Promise.all(promises).then(setData);
    }, []);    
    
    return (
        <div className='homeCont'>
            { deviceData }
        </div>
    );
}

export default Home;
