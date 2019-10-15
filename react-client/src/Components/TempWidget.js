import React, {useEffect, useState} from 'react'
import {createUseStyles} from 'react-jss'
import ModalTemplate from "./ModalTemplate"
import TempModalContent from "./TempModalContent"

function TempWidget(props) {
    const [tempModal, setModal] = useState(false);
    let classes;
    let temp = (props.sensor.temp != "#") ? parseInt(props.sensor.temp) : 90;
    let hueColor = -0.0000233100233099533*Math.pow(temp,4)+0.00403522403520387*Math.pow(temp,3)-0.0144133644112692*Math.pow(temp,2)-29.8168868169803*temp+1387.71173271325
    hueColor = (hueColor>300) ? 300 : (hueColor<0) ? 0 : hueColor; //Forces hue in range between 0 and 300
    let styleProps = {hueColor};

    const useStyles = createUseStyles({ 
        tempWidgetCircle:{
            height: '90px',
            width: '90px',
            borderRadius: '50%',
            alignSelf: 'center',
            justifySelf: 'left',
            marginLeft: '5px',
            color: '#20232A',
            display: 'grid',
            position: 'relative',
            border: styleProps => '5px solid hsl('+styleProps.hueColor+',100%,50%)',
        },
        tempNum:{
            placeSelf: 'center',
            fontSize: '48px',
            margin: '0',
        },
        tempRainDrop:{
            position: 'absolute',
            bottom: '-8px',
            right: '-10px',
            display: 'grid',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundImage:"url('./images/raindrop.png')",
        },
        tempRainDropP:{
            placeSelf: 'center',
            fontSize: '24px',
            margin: '10px auto 0px auto', 
            color: 'white',
        },
        tempDetails:{
            color: '#20232A',
            display: 'grid',
        },
        tempDetailsP:{
            margin: '0px',
            placeSelf: 'center',
        },
        tempLoading:{
            placeSelf: 'center',
        },
        tempUpdated:{
            position: 'absolute',
            fontSize: '12px',
            bottom: '1px',
            right: '3px',
            margin: '0px',
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
            {tempModal && <ModalTemplate deleteModal={deleteModal} content={<TempModalContent sensor={props.sensor}/>}/>}
            <div className='widgetCont' onClick={loadModal}>
                <div className={classes.tempWidgetCircle}>
                    <p className={classes.tempNum}>{props.sensor.temp}</p>
                    <div className={classes.tempRainDrop} style={{backgroundImage:"url('./images/raindrop.png')", height:'50px', width:'35px'}}>
                        <p className={classes.tempRainDropP}>{props.sensor.humid}</p>
                    </div>
                </div>
                <div className={classes.tempDetails}>
                    <p className={classes.tempDetailsP} style={{fontSize:"24px", fontWeight:"bold"}}>{ props.sensor.name }</p>
                    <p className={classes.tempDetailsP} style={{fontSize:"18px"}}>{ props.sensor.ipAddress }</p>
                </div>
                <p className={classes.tempUpdated}>Last Updated: { props.sensor.updated }</p>
            </div>
        </div>
    );
}

export default TempWidget;
