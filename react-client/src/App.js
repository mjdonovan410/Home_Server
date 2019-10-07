import React, { useState, useEffect } from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import Devices from './Components/Devices'
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
        <Route exact path='/' render={() =>
          (data !== null) && <Home deviceList={data}/>
        } />
        <Route path='/devices' render={() =>
          (data !== null) && <Devices deviceList={data}/>
        } />
      </div>
    </BrowserRouter>
  );
}

export default App;
