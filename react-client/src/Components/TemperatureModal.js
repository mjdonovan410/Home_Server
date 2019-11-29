import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {createUseStyles} from 'react-jss'

function TemperatureModal(props) {
    let classes;
    const [deviceData, setData] = useState({"name":props.sensor.name, "temp":props.sensor.temp, "humid":props.sensor.humid, "ipAddress":props.sensor.ipAddress});
    let styleProps = props.styleProps
    
    const useStyles = createUseStyles({
        deviceName:{
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Marvel",
            margin: "0px",
        },
        ipAddress:{
            fontSize: "24px",
            fontFamily: "Marvel",
            margin: "5px 0px 20px 0px",
        },
        tempWidgetCircle:{
            height: '120px',
            width: '120px',
            borderRadius: '50%',
            alignSelf: 'center',
            justifySelf: 'left',
            margin: "0 0 50px 0",
            color: '#20232A',
            display: 'grid',
            position: 'relative',
            border: styleProps => '6px solid hsl('+styleProps.hueColor+',100%,50%)',
        },
        tempNum:{
            placeSelf: 'center',
            fontSize: '60px',
            fontFamily: "Marvel",
            margin: '0',
        },
        tempRainDrop:{
            height: '65px', 
            width: '48px',
            position: 'absolute',
            bottom: '-12px',
            right: '-16px',
            display: 'grid',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundImage:"url('./images/raindrop.png')",
        },
        tempRainDropP:{
            placeSelf: 'center',
            fontSize: '32px',
            fontFamily: "Marvel",
            margin: '15px auto 0px auto', 
            color: 'white',
        },
        chartDiv:{
            height:"250px",
            width:"450px",
        },
    })

    useEffect(() => {
    },[]);

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Temperature',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'white',
            borderColor: 'rgb(247,155,79)',
            pointBorderColor: 'rgb(247,155,79)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgb(247,155,79)',
            pointHoverBorderColor: 'rgba(191,91,9,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [70, 72, 69, 71, 70, 70, 71]
          },
          {
            label: 'Humidity',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'white',
            borderColor: 'rgb(110,187,208)',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(34,89,104,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 2,
            pointHitRadius: 10,
            data: [33, 30, 36, 32, 34, 31, 29]
          }
        ]
      };

    classes = useStyles(styleProps);
    return (
        <div style={{alignSelf:"center"}} align="center">
            <p className={classes.deviceName}>{deviceData.name}</p>
            <p className={classes.ipAddress}>{deviceData.ipAddress}</p>
            
            <div className={classes.tempWidgetCircle}>
                <p className={classes.tempNum}>{props.sensor.temp}</p>
                <div className={classes.tempRainDrop}>
                    <p className={classes.tempRainDropP}>{props.sensor.humid}</p>
                </div>
            </div>
            <div className={classes.chartDiv}>
                <Line data={data} width={200} height={250} options={{ maintainAspectRatio: false }}/>
            </div>
        </div>
    );
}

export default TemperatureModal;
