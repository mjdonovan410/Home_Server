import React, { useState, useEffect } from 'react';
import {createUseStyles} from 'react-jss'
import DeviceTable from "./DeviceTable"
import ModalTemplate from "./ModalTemplate"
import AddDeviceModal from "./AddDeviceModal"

function Devices(props) {
    const [data, setData] = useState(null);
    const [modal, setModal] = useState(false);

    let classes, styleProps;
    const useStyles = createUseStyles({
        altButton:{
            fontFamily: 'Marvel',
            fontSize: '20px',
            textAlign: 'center',
            backgroundColor: '#20232A',
            borderRadius: '5px',
            padding: '5px',
            color: 'white',
            cursor: 'pointer',
            marginTop: '30px',
            transition: 'color .25s',
            '&:hover':{
                color: 'rgb(0, 195, 255)',
            }
        },
    })
    classes = useStyles(styleProps);

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
            {(data!=null) && <DeviceTable deviceList={data} updateAppData={props.updateAppData}/>}
            <span onClick={loadModal} className={classes.altButton}>Add Device</span>
            {modal && <ModalTemplate deleteModal={deleteModal} content={<AddDeviceModal/>}/>}
        </div>
    );
}

export default Devices;
