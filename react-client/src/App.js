import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import DeviceTable from './Components/DeviceTable'
import Home from './Components/Home'
import NavBar from './Components/NavBar'


function App() {  
  const [data, setData] = useState(null);
  
  useEffect(()=>{
    fetch('http://'+window.location.hostname+':9000/devices')
    .then(res => res.json())
    .then(setData);
  }, []);
  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route exact path='/'>{(data !== null) ? <Home deviceList={data}/> : null}</Route>
        <Route path='/devices'>{(data !== null) ? <DeviceTable deviceList={data}/> : null}</Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
