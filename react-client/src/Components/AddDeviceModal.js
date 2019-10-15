import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss'

function TempModalContent(props) {
    const [deviceData, setData] = useState();
    const [nameValidated, setNameValidated] = useState("");
    const [ipValidated, setIPValidated] = useState("");
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
            opacity: styleProps => (styleProps.nameValidated !== '') ? 1 : 0,
        },
        inputTextLabelIP:{
            extend: 'inputTextLabel',
            opacity: styleProps => (styleProps.ipValidated !== '') ? 1 : 0,
        },
        inputText:{
            fontSize: '20px',
            fontFamily: 'Marvel',
        },
    })

    function typeHandler(e){
        if(e.target.placeholder === 'Device Name'){
            setNameValidated(e.target.value);
        }else if(e.target.placeholder === 'IP Address'){
            setIPValidated(e.target.value);
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
