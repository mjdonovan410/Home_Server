import React, {useEffect, useState} from 'react';
import fetch from "../fetchWithTimeout"
import ModalTemplate from "./ModalTemplate"

function TempWidget(props) {
    const [deviceData, setData] = useState({"name":props.sensor.name, "temp":"#", "humid":"", "ipAddress":props.sensor.ipAddress});
    const [loadFault, setLoadFault] = useState(false);
    const [lastUpdate, setUpdate] = useState("");
    const [tempModal, setModal] = useState(false);

    function getTime(){
        var today = new Date();
        return ((today.getHours() < 10)?"0":"") + today.getHours() +":"+ ((today.getMinutes() < 10)?"0":"") + today.getMinutes() +":"+ ((today.getSeconds() < 10)?"0":"") + today.getSeconds();
    }

    const loadModal = () =>{
        setModal(true)
    }

    const deleteModal = () =>{
        setModal(false)
    }
    
    function grabDeviceData(){
        setLoadFault(false)
        console.log(props.sensor.ipAddress)
        fetch("http://"+props.sensor.ipAddress+"/json", null, 5000)
        .then(res => res.json())
        .then(resJSON => {
            setData({"name":props.sensor.name, "temp":resJSON.temperature, "humid":resJSON.humidity, "ipAddress":props.sensor.ipAddress})
            setUpdate(getTime());
        })
        .catch(err => {
            console.log(err)
            setUpdate(getTime());
            setLoadFault(true);
            setData({"name":props.sensor.name, "temp":"#", "humid":"#", "ipAddress":props.sensor.ipAddress})
        })
    }

    useEffect(() => {
        grabDeviceData();
        setInterval(grabDeviceData, 300000)
    },[]);

    return (
        <div>
            {tempModal && <ModalTemplate deleteModal={deleteModal}/>}
            <div className='widgetCont' onClick={loadModal}>
                <div className='tempWidgetCircle'>
                    {
                        (loadFault || deviceData.temp !== "#") ? 
                        <p className='tempNum'>{deviceData.temp}</p> 
                        : <img src="./images/loading.gif" width="80px" className="tempLoading"/> 
                    }
                    <div className='tempRainDrop' style={{backgroundImage:"url('./images/raindrop.png')", height:'50px', width:'35px'}}>
                        <p>{deviceData.humid}</p>
                    </div>
                </div>
                <div className="tempDetails">
                    <p style={{fontSize:"24px", fontWeight:"bold"}}>{ deviceData.name }</p>
                    <p style={{fontSize:"18px"}}>{ deviceData.ipAddress }</p>
                </div>
                <p className="tempUpdated">Last Updated: { lastUpdate }</p>
            </div>
        </div>
    );
}

export default TempWidget;
