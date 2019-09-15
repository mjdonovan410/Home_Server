import React, {useState, useEffect} from 'react';
import localForage from "localforage";
import { isNull } from 'util';

function DeviceList(){
    let data, devices;
    fetch("http://localhost:9000/devices")
        .then(res => {
            data = res;
            console.log(data)
        })

    // const [cnt, setCnt] = useState(0);
    // const [devNum, setDevices] = useState(<div></div>);

    // const styles = {
    //     showOnHomeStyle: {
    //         backgroundSize: '24px',
    //         backgroundPosition: 'center',
    //         backgroundRepeat: 'no-repeat',
    //         cursor: 'pointer'
    //     }
    // }

    // let genTable = (device,count) => {
    //     return(
    //         <div className='devListCont' style={(count % 2 === 0) ? {backgroundColor:'#eee'} : {}} key={device.id}>
    //             <p className='devListRow'>{device.id}</p>
    //             <p className='devListRow'>{device.name}</p>
    //             <p className='devListRow'>{device.deviceType}</p>
    //             <p className='devListRow'>{device.ipAddress}</p>
    //             <div onClick={ () => clickHandler(device.id)} align='center' style={{...styles.showOnHomeStyle, 
    //                 ...{backgroundImage:(device.showOnHome) ? 'url("./images/show.png")' : 'url("./images/hide.png")'}}}>
    //             </div>
    //         </div>
    //     )
    // }

    // // Updates the settings in localForage and forces component refresh
    // function clickHandler(id){
    //     devices = data.map((device,count=0) => {
    //         if(device.id === id){
    //             device.showOnHome = !device.showOnHome;
    //             console.log("CHANGE")
    //         }
    //         count += 1
    //         return (genTable(device, count))
    //     })
    //     setCnt(cnt+1);

    //     localForage.setItem('deviceList', JSON.stringify(data))
    // }

    // useEffect(() => {
    //     // Checks if variable is already stored in localForage
    //     localForage.getItem('deviceList', function(err, value){
    //         if(isNull(value)){
    //             data = require('../files/devices.json');
    //             localForage.setItem('deviceList', JSON.stringify(data))
    //             //console.log('Loaded From File')
    //         }else{
    //             data = JSON.parse(value);
    //             //console.log('Loaded From Forage')
    //         }

    //         //console.log(data)
    //         // sorts by the user's selected order
    //         data.sort(function(a, b){
    //             return a.order - b.order;
    //         });
            
    //         devices = data.map((device,i=0) => {
    //             i += 1
    //             return(genTable(device, i))
    //         })
            
    //         //console.log(devices)
    //         setDevices(devices); //update state
    //     })
    // }, []);

    return(
        <div style={{margin:'10px'}}>
            <div className='devListCont' style={{backgroundColor:'#20232A', color:'white'}}>
                <p className='devListRow'>ID</p>
                <p className='devListRow'>Name</p>
                <p className='devListRow'>Device Type</p>
                <p className='devListRow'>IP Address</p>
                <p className='devListRow'>Show</p>
            </div>
            {devices}
        </div>
    )
}

export default DeviceList