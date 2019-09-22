import React from 'react';

function TempWidget(props) {
    console.log(props.tempSensor)

    return (
        <div className='widgetCont'>
            <div className='tempWidgetCircle'>
                <p className='tempNum'>{props.tempSensor.temp}</p>
                <div className='tempRainDrop' style={{backgroundImage:"url('./images/raindrop.png')", height:'50px', width:'35px'}}>
                    <p>{props.tempSensor.humid}</p>
                </div>
            </div>
        </div>
    );
}

export default TempWidget;
