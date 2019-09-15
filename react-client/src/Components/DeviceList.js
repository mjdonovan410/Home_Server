import React, { useState, useEffect } from 'react';

function DeviceList() {
    let devices;

    const [cnt, setCnt] = useState(0);
    const [data, setData] = useState(null);

    useEffect(()=>{
        fetch('http://localhost:9000/devices')
        .then(res => res.json())
        .then(setData);
    }, []);

    const styles = {
        showOnHomeStyle: {
            backgroundSize: '24px',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer'
        }
    };

    let genTable = (device, count) => {
        return (
            <div
                className="devListCont"
                style={count % 2 === 1 ? { backgroundColor: '#eee' } : {}}
                key={device.id}
            >
                <p className="devListRow">{device.id}</p>
                <p className="devListRow">{device.name}</p>
                <p className="devListRow">{device.deviceType}</p>
                <p className="devListRow">{device.ipAddress}</p>
                <div
                    onClick={() => clickHandler(device.id)}
                    align="center"
                    style={{
                        ...styles.showOnHomeStyle,
                        ...{
                            backgroundImage: device.showOnHome
                                ? 'url("./images/show.png")'
                                : 'url("./images/hide.png")'
                        }
                    }}
                ></div>
            </div>
        );
    };

    // Updates the settings in localForage and forces component refresh
    function clickHandler(id) {
        devices = data.map((device, count = 0) => {
            if (device.id === id) {
                device.showOnHome = !device.showOnHome;
                console.log('CHANGE');
            }
            count += 1;
            return genTable(device, count);
        });
        setCnt(cnt + 1);
    }

    if (data === null) return null;

    // sorts by the user's selected order
    data.sort(function(a, b) {
        return a.order - b.order;
    });

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
            </div>
            {devices}
        </div>
    );
}

export default DeviceList;
