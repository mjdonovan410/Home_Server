import React, {useEffect, useState} from 'react';
import fetch from "../fetchWithTimeout"
import ModalTemplate from "./ModalTemplate"
import TempModalContent from "./TempModalContent"

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

    return (
        <div>
            {tempModal && <ModalTemplate deleteModal={deleteModal} content={<TempModalContent sensor={props.sensor}/>}/>}
            <div className='widgetCont' onClick={loadModal}>
                <div className='tempWidgetCircle'>
                    <p className='tempNum'>{props.sensor.temp}</p>
                    <div className='tempRainDrop' style={{backgroundImage:"url('./images/raindrop.png')", height:'50px', width:'35px'}}>
                        <p>{props.sensor.humid}</p>
                    </div>
                </div>
                <div className="tempDetails">
                    <p style={{fontSize:"24px", fontWeight:"bold"}}>{ props.sensor.name }</p>
                    <p style={{fontSize:"18px"}}>{ props.sensor.ipAddress }</p>
                </div>
                <p className="tempUpdated">Last Updated: { props.sensor.updated }</p>
            </div>
        </div>
    );
}

export default TempWidget;
