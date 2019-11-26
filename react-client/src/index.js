import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {useRoutes} from 'hookrouter'
import * as serviceWorker from './serviceWorker';
import './Stylesheets/index.css';
import './Stylesheets/home.css';
import Devices from './Components/Devices'
import Home from './Components/Home'
import NavBar from './Components/NavBar'

function App() {  
  const [data, setData] = useState(null);
  const [trigger, setTrigger] = useState(1);
  const refreshRate = 5;

  function refreshData(){
    if(trigger === 1){
        console.log('Update device data from server')
        fetch('http://'+window.location.hostname+':9000/devices')
        .then(res => res.json())
        .then(setData);
        setTrigger(0)
    }
  }

  useEffect(()=>{
    refreshData()
    setInterval(refreshData, refreshRate*60000)
  }, []);

  function updateAppData(newData){
    setData(newData);
  }

  const routes = {
    "/": () => <Home deviceList={data}/>,
    "/devices": () => <Devices deviceList={data} updateAppData={updateAppData}/>
  };

  const routeResult = useRoutes(routes);
  return (
      <div className="App">
        <NavBar />
        {(data!=null) && routeResult}
      </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
