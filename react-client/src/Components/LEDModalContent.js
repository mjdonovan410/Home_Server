import React, {useEffect, useState} from 'react';
import {createUseStyles} from 'react-jss'

function LEDModalContent(props) {
    let classes;
    const [hexColor, setHEXColor] = useState("#FF0000");
    const [rgbColor, setRGBColor] = useState({'red':255,'green':255,'blue':255});
    const [hueVal, setHue] = useState(0);
    const [liveUpdate, setLiveUpdate] = useState(false);
    const [lightVal, setLight] = useState(50);
    const [res, setResponse] = useState(true);
    let styleProps = {lightVal, hueVal, hexColor};
    let error = '';
    
    const useStyles = createUseStyles({
        slider:{
            '-webkit-appearance': 'none',
            width: '100%',
            height: '20px',
            borderRadius: '5px',
            outline: 'none',
            opacity: '0.6',
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
            },
            '&:hover':{
                opacity: 1,
            }
        },
        hueSlider:{
            extend: "slider",
            backgroundPosition: 'center',
            backgroundSize: 'contain,cover',
            backgroundImage: 'url("./images/hue-fader.png")',
            '&::-webkit-slider-thumb':{
                backgroundColor: styleProps => "hsl("+styleProps.hueVal+",100%,50%)",
            }
        },
        lightSlider:{
            extend: "slider",
            backgroundImage: styleProps => 'linear-gradient(to right, black, hsl('+styleProps.hueVal+',100%,50%), white)',
            '&::-webkit-slider-thumb':{
                backgroundColor: styleProps => "hsl("+styleProps.hueVal+",100%,"+styleProps.lightVal+"%)",
            }
        },
        outerContainer:{
            display: 'grid',
            placeSelf: 'center',
            gridTemplateColumns: '1fr auto 1fr',
            gridTemplateRows: '1fr auto 1fr',
            gridTemplateAreas: 'header header header lsidebar center rsidebar footer footer footer',
        },
        innerContainer:{
              width: '300px', 
              gridArea: 'center',
        },
        rgbHex:{
            width: '100%', 
            justifySelf: 'center',
            alignSelf: 'end',
            backgroundColor: 'black', 
            color: 'white',
            fontFamily: 'Arial, Helvetica, sans-serif',
            fontSize: '14px',
        },
        square:{
            height: '110px',
            width: '100px',
            border: '1px solid black',
            marginBottom: '20px',
            backgroundColor: styleProps => styleProps.hexColor,
            display: 'grid',
        },
    })

    // Assumes saturation and light are whole numbers (e.g. 100% = 100). Returns an array [r,g,b]
    // Straight magic... Equations from https://www.rapidtables.com/convert/color/hsl-to-rgb.html
    function hsl2rgb(h,s,l){
        let c = (1-Math.abs(2*(l/100)-1))*(s/100);
        let x = c * (1-Math.abs(((h/60)%2)-1))
        let m = (l/100)-(c/2)
        let rgbPrimes = [[c,x,0],[x,c,0],[0,c,x],[0,x,c],[x,0,c],[c,0,x]];
        let rgbPrime = rgbPrimes[Math.floor(h/60)]
        let [red,green,blue] = [Math.floor((rgbPrime[0]+m)*255),Math.floor((rgbPrime[1]+m)*255),Math.floor((rgbPrime[2]+m)*255)];
        return [red < 0 ? 0 : red, green < 0 ? 0 : green, blue < 0 ? 0 : blue] //Prevents negative numbers
    }

    function dec2hex(number){
        number = number < 0 ? 0xFF+number+1 : number;
        return number < 16 ? "0"+number.toString(16).toUpperCase() : number.toString(16).toUpperCase();
    }

    function sliderHandler(e){
        setHue(document.getElementById("hue").value)
        setLight(document.getElementById("lightness").value)
        let [r,g,b] = hsl2rgb(hueVal,100,lightVal)
        setHEXColor("#"+dec2hex(r)+dec2hex(g)+dec2hex(b))
        setRGBColor({'red':r, 'green':g, 'blue':b})
        
        if(liveUpdate && res)
            postColorChange()
    }

    function liveUpdateHandler(e){
        if(e.target.checked)
            setLiveUpdate(true)
        else
            setLiveUpdate(false)
    }

    function postColorChange(){
        setResponse(false)
        fetch('http://'+props.sensor.ipAddress+'/led_strip?power=on&r='+rgbColor.red+'&g='+rgbColor.green+'&b='+rgbColor.blue, {
            method: 'POST',
            body: JSON.stringify(rgbColor),
        })
        .then(()=>{
            setResponse(true)
        })
        .catch((err)=> {
            setResponse(true)
            error = err
            console.log(error)
        })
    }

    classes = useStyles(styleProps);
    return (
        <div className={classes.outerContainer}>
		    <div className={classes.innerContainer} align='center'>
                <div className={classes.square}>
                    <span className={classes.rgbHex}>{hexColor}</span>
                </div>
                <input type='range' defaultValue="0" id='hue' min='0' max='359' step='1' onChange={sliderHandler} className={classes.hueSlider}></input>
                <input type='range' defaultValue="50" id='lightness' min='0' max='100' step='1' onChange={sliderHandler} className={classes.lightSlider}></input>
                <label><input type='checkbox' id='liveUpdate' onChange={liveUpdateHandler}/>Live Update</label>

                {/* <div id='submitButton' className='altButton' style='width:150px;'>SUBMIT</div> */}
                <br/><p>{error}</p>
            </div>
        </div>
    );
}

export default LEDModalContent;
