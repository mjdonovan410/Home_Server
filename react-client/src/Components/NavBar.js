import React from 'react';
import {createUseStyles} from 'react-jss'

function NavBar(){
    let classes, styleProps;
    const useStyles = createUseStyles({
        navCont:{
            width: '600px',
            height: '50px',
            display: 'grid',
            margin: '0 auto',
            padding: '5px',
            fontFamily: 'Marvel',
            fontSize: '20px',
            letterSpacing: '2px',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gridTemplateRows: '50px',
        },
        navObj:{
            width: '120px',
            color: 'white',
            padding: '5px',
            margin: '0px auto -5px auto',
            textAlign: 'center',
            fontWeight: 'lighter',
            alignSelf: 'end',
            textDecoration: 'none',
            borderRadius: '5px 5px 0px 0px',
            transition: 'color .25s',
            '&:hover':{
                color: 'rgb(0, 195, 255)',
            }
        },  
        headerBar:{
            backgroundColor: '#20232A',
        },
    })
    
    classes = useStyles(styleProps);
    return(
        <div className={classes.headerBar}>
            <div className={classes.navCont}>
                <img src='./images/logo.png' alt='logo' height='48px' width='112px'/>
                <a href="/" className={classes.navObj}>Home</a>
                <a href="/devices" className={classes.navObj}>Devices</a>
                <a href="/settings" className={classes.navObj}>Settings</a>
            </div>
        </div>
    );
}

export default NavBar