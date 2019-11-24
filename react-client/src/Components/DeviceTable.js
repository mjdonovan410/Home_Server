import React, { useState, useEffect } from 'react';
import {createUseStyles} from 'react-jss'

function DeviceTable(props) {
    let devices;
    const [data, setData] = useState(null);
    
    let classes, styleProps;
    const useStyles = createUseStyles({
        devList:{
            width: '575px',
            margin: 'auto',
            fontFamily: 'Marvel',
            fontSize: '16px',
            letterSpacing: '1px',
            display: 'grid',
            gridTemplateColumns: '1fr 7fr 4fr 5fr 2fr 2fr 1fr',
            gridTemplateRows: '26px',
        },
        devListCont:{
            extend: 'devList',
            transition: 'background-color .25s',
            '&:nth-child(odd)':{
                backgroundColor: '#eee',
            },
            '&:hover':{
                backgroundColor: 'rgb(0, 195, 255, .35)',
            },
        },
        devListHeader:{
            extend: 'devList',
            backgroundColor: '#20232A', 
            color: 'white',
        },
        devListRow:{
            placeSelf: 'center',
        },
    })
    classes = useStyles(styleProps);

    useEffect(()=>{
        setData(props.deviceList.slice());
    }, []);

    if (data === null) return null;
    
    // Sorts the data by the object's display order
    data.sort(function(a, b) {
        return a.order - b.order;
    });

    // Generates the one row of the table
    let genTable = (device) => {
        return (
            <div className={classes.devListCont} key={device.id}>
                <p className={classes.devListRow}>{device.id}</p>
                <p className={classes.devListRow}>{device.name}</p>
                <p className={classes.devListRow}>{device.deviceType}</p>
                <p className={classes.devListRow}>{device.ipAddress}</p>
                <img src={(device.showOnHome) ? "./images/show.png" : "./images/hide.png"} height="20px" onClick={() => showHandler(device.order)} className={classes.devListRow} alt="showIcon"/>
                <div className={classes.devListRow} style={{'height':'20px'}}>
                    <img src="./images/upArrow.png" height="20px" onClick={() => orderHandler(device.order, 'up')} alt="upIcon"/>
                    <img src="./images/downArrow.png" height="20px" onClick={() => orderHandler(device.order, 'down')} alt="downIcon"/>
                </div>
                <img src="./images/close.png" height="16px" onClick={() => deleteHandler(device.order)} className={classes.devListRow} alt="deleteIcon"/>
            </div>
        );
    };

    // Sends the updated settings to the server
    function updateDeviceList(newData){
        let diff = data !== newData;
        newData.sort(function(a, b) {
            return a.order - b.order;
        })

        console.log(newData)
        
        setData(newData);
        if(diff){
            props.updateAppData(newData);
            fetch('http://localhost:9000/devices', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData)
            });
        }
    }

    // Updates the settings in localForage and forces component refresh
    function showHandler(order) {
        let newData = data.slice();
        newData[order-1].showOnHome = !newData[order-1].showOnHome;
        
        devices = newData.map(genTable);
        updateDeviceList(newData);
    }

     // Removes the item by pushing everything up by 1 in the order and not putting it back in to the array
    function deleteHandler(order) {
        let newData = [];
        
        devices = data.map((device) => {
            if(device.order !== order){
                if(device.order > order)
                    device.order -= 1;
                newData.push(device);
                return genTable(device);
            }
            
            return null
        });

        updateDeviceList(newData);
    }

    // Swaps the order of the one selected and the one in the desired direction.
    function orderHandler(order, direction) {
        let newData = data.slice();
        newData.sort(function(a, b) {
            return a.order - b.order;
        });
        
        if(direction === 'up' && order > 1){
            newData[order-1].order -= 1;
            newData[order-2].order += 1;
        }
        else if(direction === 'down' && order < Object.keys(newData).length){
            newData[order-1].order += 1;
            newData[order].order -= 1;
        }
        
        devices = newData.map(genTable);
        updateDeviceList(newData);
    }

    devices = data.map(genTable);
    return (
        <div style={{ margin: '10px' }}>
            <div className={classes.devListHeader}>
                <p className={classes.devListRow}>ID</p>
                <p className={classes.devListRow}>Name</p>
                <p className={classes.devListRow}>Device Type</p>
                <p className={classes.devListRow}>IP Address</p>
                <p className={classes.devListRow}>Show</p>
                <p className={classes.devListRow}>Order</p>
                <p className={classes.devListRow}></p>
            </div>
            {devices}
        </div>
    );
}

export default DeviceTable;
