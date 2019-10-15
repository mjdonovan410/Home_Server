import React, {useEffect, useState} from 'react'
import {createUseStyles} from 'react-jss'
import ModalTemplate from "./ModalTemplate"
import LEDModalContent from "./LEDModalContent"

function LEDWidget(props) {
    const [ledModal, setModal] = useState(false);
    let classes;
    let ledColor = props.sensor.color;
    let styleProps = {ledColor};

    const useStyles = createUseStyles({ 
        ledColorSquare:{
            placeSelf:"center", 
            width:"80px", 
            height:"80px",
            border:'1px solid black',
            marginLeft: '10px',
            backgroundColor: styleProps => 'rgb('+styleProps.ledColor.red+','+styleProps.ledColor.green+','+styleProps.ledColor.blue+')'
        },
        tempDetails:{
            color: '#20232A',
            display: 'grid',
        },
        tempDetailsP:{
            margin: '0px',
            justifySelf: 'center',
        },
    })

    const loadModal = () =>{
        setModal(true)
    }

    const deleteModal = () =>{
        setModal(false)
    }

    classes = useStyles(styleProps);
    return (
        <div>
            {ledModal && <ModalTemplate deleteModal={deleteModal} content={<LEDModalContent sensor={props.sensor}/>}/>}
            <div className='widgetCont' onClick={loadModal}>
                <span className={classes.ledColorSquare}></span>
                <div className={classes.tempDetails}>
                    <p className={classes.tempDetailsP} style={{fontSize:"24px", fontWeight:"bold", alignSelf: 'end'}}>{ props.sensor.name }</p>
                    <p className={classes.tempDetailsP} style={{fontSize:"18px", alignSelf: 'start'}}>{ props.sensor.ipAddress }</p>
                </div> 
            </div>
        </div>
    );
}

export default LEDWidget;
