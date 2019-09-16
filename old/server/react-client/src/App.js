import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom'
import DeviceList from './Components/DeviceList'
import NavBar from './Components/NavBar'


function App() {  
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <Route exact path='/' />
        <Route path='/devices' component={DeviceList} />
      </div>
    </BrowserRouter>
  );
}

export default App;
