import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { TweetCoponent } from './tweets';
import reportWebVitals from './reportWebVitals';

const tweetEl = document.getElementById('root');
const root = ReactDOM.createRoot(tweetEl);
// console.log(tweetEl.dataset)
root.render(
    <TweetCoponent className='container'/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
