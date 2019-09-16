import React, { useState, useEffect } from 'react';

function DeviceList() {
    let devices;
    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:9000/devices')
        .then(res => res.json())
        .then(setData);
    }, []);

    if (data === null) return null;
    
    data.sort(function(a, b) {
        return a.order - b.order;
    });
    console.log("SORTED")

    let genTable = (device) => {
        return (
            <div
                className="devListCont"
                key={device.id}
            >
                <p className="devListRow">{device.id}</p>
                <p className="devListRow">{device.name}</p>
                <p className="devListRow">{device.deviceType}</p>
                <p className="devListRow">{device.ipAddress}</p>
                <img src={(device.showOnHome) ? "./images/show.png" : "./images/hide.png"} height="20px" onClick={() => showHandler(device.order)} className="devListRow"/>
                <div className="devListRow" style={{'height':'20px'}}>
                    <img src="./images/upArrow.png" height="20px" onClick={() => orderHandler(device.order, 'up')}/>
                    <img src="./images/downArrow.png" height="20px" onClick={() => orderHandler(device.order, 'down')}/>
                </div>
                <img src="./images/close.png" height="16px" onClick={() => deleteHandler(device.order)} className="devListRow"/>
            </div>
        );
    };

    // Sends the updated settings to the server
    function updateServerJSON(){
        fetch('http://localhost:9000/devices', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
    }

    // Updates the settings in localForage and forces component refresh
    function showHandler(order) {
        let newData = data.slice();
        newData[order-1].showOnHome = !newData[order-1].showOnHome;
        
        devices = newData.map((device) => {
            return genTable(device);
        });

        setData(newData);
        updateServerJSON();
    }

    function deleteHandler(order) {
        let newData = [];
        
        // Removes the item by pushing everything up by 1 in the order and not putting it back in to the array
        devices = data.map((device) => {
            if(device.order !== order){
                if(device.order > order)
                    device.order -= 1;
                newData.push(device);
                return genTable(device);
            }
            
            return null
        });

        setData(newData);
        updateServerJSON();
    }

    function orderHandler(order, direction) {
        let newData = data.slice();
        if(direction === 'up' && order > 1){
            newData[order-1].order -= 1;
            newData[order-2].order += 1;
        }
        else if(direction === 'down' && order < Object.keys(newData).length){
            newData[order-1].order += 1;
            newData[order].order -= 1;
        }
        
        devices = newData.map((device) => {
            return genTable(device);
        });

        setData(newData);
        updateServerJSON()
    }

    devices = data.map(genTable);

    return (
        <div style={{ margin: '10px' }}>
            <div
                className="devListCont"
                style={{ backgroundColor: '#20232A', color: 'white' }}
            >
                <p className="devListRow">ID</p>
                <p className="devListRow">Name</p>
                <p className="devListRow">Device Type</p>
                <p className="devListRow">IP Address</p>
                <p className="devListRow">Show</p>
                <p className="devListRow">Order</p>
                <p className="devListRow"></p>
            </div>
            {devices}
        </div>
    );
}

export default DeviceList;
