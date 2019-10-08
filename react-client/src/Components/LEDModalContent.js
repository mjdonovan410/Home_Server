import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss'

function LEDModalContent() {
    let rVal, gVal, bVal, hueVal;
    let classes;
    const [sqColor, setColor] = useState("#FF0000");
    const useStyles = createUseStyles({
        slider:{
            '-webkit-appearance': 'none',
            width: '100%',
            height: '20px',
            borderRadius: '5px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain, cover',
            outline: 'none',
            opacity: '0.5',
            marginBottom: '30px',
            '-webkit-transition': '.2s',
            transition: 'opacity .2s',
            '&::-webkit-slider-thumb':{
                '-webkit-appearance': 'none',
                appearance: 'none',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                backgroundColor: sqColor => sqColor,
            },
            '&:hover':{
                opacity: 1,
            }
        }
    })
    classes = useStyles(sqColor);

    function sliderMoved(e){
        rVal = (document.getElementById("red").value > 255) ? document.getElementById("red").value-1 : document.getElementById("red").value;
        gVal = (document.getElementById("green").value > 255) ? document.getElementById("green").value-1 : document.getElementById("green").value;
        bVal = (document.getElementById("blue").value > 255) ? document.getElementById("blue").value-1 : document.getElementById("blue").value;
        hueVal = document.getElementById("hue").value
        //let rgb = bVal | (gVal << 8) | (rVal << 16);
        //let hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
        //setColor(hex)
        setColor("hsl("+hueVal+",100%,50%)")
    }

    return (
        <div id='gridLayout'>
		    <div id='container' align='center'>
                <div id='square' style={{"backgroundColor":sqColor}}>
                    <span id='rgbHex'>{sqColor}</span>
                </div>
                <input type='range' defaultValue="0" id='hue' min='0' max='360' step='1' onChange={sliderMoved} className={classes.slider} style={{backgroundImage: "url('./images/hue-fader.png')"}}></input>
                <input type='range' defaultValue="128" id='red' min='0' max='256' step='16' onChange={sliderMoved} className='slider redSlider'></input>
                <input type='range' defaultValue="128" id='green' min='0' max='256' step='16' onChange={sliderMoved} className='slider greenSlider'></input>
                <input type='range' defaultValue="128" id='blue' min='0' max='256' step='16' onChange={sliderMoved} className='slider blueSlider'></input>
                
                {/* <div id='submitButton' className='altButton' style='width:150px;'>SUBMIT</div> */}
            </div>
        </div>
    );
}

export default LEDModalContent;
