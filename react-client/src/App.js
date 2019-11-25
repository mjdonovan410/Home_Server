import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Devices from './Components/Devices'
import Home from './Components/Home'
import NavBar from './Components/NavBar'


function App() {  
  const [data, setData] = useState(null);
  const refreshRate = 0.5;

  const refreshData = () => {
    console.log('Update device data from server')
    fetch('http://'+window.location.hostname+':9000/devices')
    .then(res => res.json())
    .then(setData);
  }

  useEffect(()=>{
    refreshData()
  }, []);

  function updateAppData(newData){
    setData(newData);
  }
  
  setInterval(()=>{
    refreshData()
  }, refreshRate*60000)

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route exact path='/' render={() =>
          (data !== null) && <Home deviceList={data}/>
        } />
        <Route path='/devices' render={() =>
          (data !== null) && <Devices deviceList={data} updateAppData={updateAppData}/>
        } />
      </div>
    </BrowserRouter>
  );
}

export default App;
