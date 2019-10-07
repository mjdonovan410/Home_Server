import React, {useEffect, useState} from 'react';

function LEDModalContent() {
    let rVal, gVal, bVal;
    const [sqColor, setColor] = useState("#ffffff");

    function sliderMoved(e){
        rVal = (document.getElementById("red").value > 255) ? document.getElementById("red").value-1 : document.getElementById("red").value;
        gVal = (document.getElementById("green").value > 255) ? document.getElementById("green").value-1 : document.getElementById("green").value;
        bVal = (document.getElementById("blue").value > 255) ? document.getElementById("blue").value-1 : document.getElementById("blue").value;
        let rgb = bVal | (gVal << 8) | (rVal << 16);
        let hex = '#' + (0x1000000 + rgb).toString(16).slice(1);
        setColor(hex)
    }

    return (
        <div id='gridLayout'>
		    <div id='container' align='center'>
                <div id='square' style={{"backgroundColor":sqColor}}>
                    <span id='rgbHex'>{sqColor}</span>
                </div>
                <input type='range' id='red' min='0' max='256' step='16' onChange={sliderMoved} className='slider redSlider'></input>
                <input type='range' id='green' min='0' max='256' step='16' onChange={sliderMoved} className='slider greenSlider'></input>
                <input type='range' id='blue' min='0' max='256' step='16' onChange={sliderMoved} className='slider blueSlider'></input>
                
                {/* <div id='submitButton' className='altButton' style='width:150px;'>SUBMIT</div> */}
            </div>
        </div>
    );
}

export default LEDModalContent;
