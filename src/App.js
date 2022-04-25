import React from 'react';
import './App.css';
import Routes from './router';
import moment from 'moment-timezone';

function App() {
  moment.tz.setDefault('Europe/Istanbul')
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
