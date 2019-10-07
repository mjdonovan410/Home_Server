import React, { useState, useEffect } from 'react';
import DeviceTable from "./DeviceTable"
import ModalTemplate from "./ModalTemplate"

function Devices(props) {
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false);

    const loadModal = () =>{
        setModal(true)
    }

    const deleteModal = () =>{
        setModal(false)
    }

    useEffect(()=>{
        setData(props.deviceList.slice());
    }, []);

    return (
        <div align="center">
            {(data!=null) && <DeviceTable deviceList={data}/>}
            <span onClick={loadModal} className="altButton">Add Device</span>
            {modal && <ModalTemplate deleteModal={deleteModal}/>}
        </div>
    );
}

export default Devices;
