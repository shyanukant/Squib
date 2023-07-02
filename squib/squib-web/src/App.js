import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { TweetCoponent } from './tweets';

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <TweetCoponent/>
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
