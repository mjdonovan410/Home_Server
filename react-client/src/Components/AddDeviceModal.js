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
        },
        inputTextDiv:{
            fontSize: '20px',
            margin: '30px 0px 10px 0px',
            position:'relative',
            fontFamily: 'Marvel',
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
                <select>
                    <option>Temperature</option>
                    <option>LED</option>
                </select>
                <input type="button" value="Submit"/>
            </form>
        </div>
    );
}

export default TempModalContent;
