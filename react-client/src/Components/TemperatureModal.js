import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {createUseStyles} from 'react-jss'

function TemperatureModal(props) {
    let classes;
    const [deviceData, setData] = useState({"name":props.sensor.name, "temp":"#", "humid":"", "ipAddress":props.sensor.ipAddress});
    let styleProps = props.styleProps
    
    const useStyles = createUseStyles({
        deviceName:{
            fontSize: "36px",
            fontWeight: "bold",
            fontFamily: "Marvel",
            margin: "50px 0px 0px 0px",
        },
        ipAddress:{
            fontSize: "24px",
            fontFamily: "Marvel",
            margin: "5px 0px 20px 0px",
        },
        tempWidgetCircle:{
            height: '200px',
            width: '200px',
            borderRadius: '50%',
            alignSelf: 'center',
            justifySelf: 'left',
            margin: "0 0 50px 0",
            color: '#20232A',
            display: 'grid',
            position: 'relative',
            border: styleProps => '10px solid hsl('+styleProps.hueColor+',100%,50%)',
        },
        tempNum:{
            placeSelf: 'center',
            fontSize: '96px',
            margin: '0',
        },
        tempRainDrop:{
            height:'100px', 
            width:'70px',
            position: 'absolute',
            bottom: '-16px',
            right: '-20px',
            display: 'grid',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundImage:"url('./images/raindrop.png')",
        },
        tempRainDropP:{
            placeSelf: 'center',
            fontSize: '36px',
            margin: '20px auto 0px auto', 
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
            label: 'Test Dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
          }
        ]
      };

    classes = useStyles(styleProps);
    return (
        <div align="center">
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
