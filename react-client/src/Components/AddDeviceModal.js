import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss'

function TempModalContent(props) {
    const [nameValidated, setNameValidated] = useState({'nameInput':'','valid':false});
    const [ipValidated, setIPValidated] = useState({'ipInput':'','valid':false});
    let classes;
    let styleProps = {ipValidated, nameValidated};

    const useStyles = createUseStyles({
        formCont:{
            display: 'grid',
        },
        addDeviceForm:{
            placeSelf: 'center',
            display: 'grid',
            gridRowTemplate: '1fr 1fr 1fr 1fr'
        },
        inputTextDiv:{
            fontSize: '20px',
            margin: '30px 0px 10px 0px',
            position:'relative',
            fontFamily: 'Marvel',
            placeSelf: 'center',
        },
        inputTextLabel:{
            position:'absolute',
            left:'0px', 
            top:'-35px',
            zIndex:'3001',
            fontSize: '16px',
            transition: 'opacity 0.25s',
        },
        inputTextLabelName:{
            extend: 'inputTextLabel',
            color: styleProps => (styleProps.nameValidated.valid) ? 'black' : 'red',
            opacity: styleProps => (styleProps.nameValidated.nameInput !== '') ? 1 : 0,
        },
        inputTextLabelIP:{
            extend: 'inputTextLabel',
            color: styleProps => (styleProps.ipValidated.valid) ? 'black' : 'red',
            opacity: styleProps => (styleProps.ipValidated.ipInput !== '') ? 1 : 0,
        },
        inputText:{
            fontSize: '20px',
            fontFamily: 'Marvel',
        },
    })

    function typeHandler(e){
        let valid = false;
        let nameUsed = false;
        if(e.target.placeholder === 'Device Name'){
            props.deviceList.map(device =>{
                if(device.name.toUpperCase() === e.target.value.toUpperCase())
                    nameUsed = true;
            });

            if(e.target.value !== '' && !nameUsed)
                valid = true;
            
            setNameValidated({'nameInput':e.target.value,'valid':valid});
        }else if(e.target.placeholder === 'IP Address'){
            if(/^(?!0)(?!.*\.$)((1?\d?\d|25[0-5]|2[0-4]\d)(\.|$)){4}$/.test(e.target.value)) //Checks for a valid IP address
                valid = true;
            
            setIPValidated({'ipInput':e.target.value,'valid':valid});
        }
    }

    function addDeviceHandler(e){
        let newDevice
        let newId
        let newOrder
        let deviceType = document.getElementById('deviceTypeDD')
        deviceType = deviceType.options[deviceType.selectedIndex].value
        let deviceList = props.deviceList.slice()

        // There is probably a better way to do this... getting the max and adding 1
        newId = deviceList.map(device => device.id).reduce((a,b)=>{return Math.max(a,b)}) + 1
        newOrder = deviceList.map(device => device.id).reduce((a,b)=>{return Math.max(a,b)}) + 1

        if(deviceType === 'Temperature'){
            newDevice = {
                "id": newId,
                "name": nameValidated.nameInput,
                "deviceType": "Temperature",
                "ipAddress": ipValidated.ipInput,
                "readOnly": true,
                "showOnHome": true,
                "order": newOrder,
                "temp": "#",
                "humid": "#",
                "updated": "xx:xx:xx"
            }
            deviceList.push(newDevice)

            fetch('http://localhost:9000/devices', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deviceList)
            })
            .then(()=>{
                props.updateDeviceData(deviceList)
                props.deleteModal()
            })

        }
    }

    classes = useStyles(styleProps);
    return (
        <div className={classes.formCont}>
            <form className={classes.addDeviceForm}>
                <div className={classes.inputTextDiv}>
                    <p className={classes.inputTextLabelName}>Device Name</p>
                    <input className={classes.inputText} onChange={typeHandler} type="text" placeholder="Device Name"/>
                </div>
                <div className={classes.inputTextDiv}>
                    <p className={classes.inputTextLabelIP}>IP Address</p>
                    <input className={classes.inputText} onChange={typeHandler} type="text" placeholder="IP Address"/>
                </div>
                <div>
                    <select id='deviceTypeDD' style={{placeSelf: 'center', margin: '10px 0px', fontFamily: 'Marvel', fontSize: '20px'}}>
                        <option>Temperature</option>
                        <option>LED</option>
                    </select>
                </div>
                {
                    (ipValidated.valid && nameValidated.valid) ? 
                        <span className='altButton' style={{placeSelf: 'center'}} onClick={addDeviceHandler}>Submit</span> : null
                }
                
            </form>
        </div>
    );
}

export default TempModalContent;
