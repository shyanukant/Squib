import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import { ProfileBadgeComponent } from './profiles';
import { TweetComponent, FeedComponent, TweetDetailComponent } from './tweets';
import reportWebVitals from './reportWebVitals';

const tweetEl = document.getElementById('root');
if (tweetEl) {
    ReactDOM.createRoot(tweetEl).render(
        <TweetComponent {...tweetEl.dataset} />
    );
}

const feedtweetEl = document.getElementById('feed');
if (feedtweetEl) {
    ReactDOM.createRoot(feedtweetEl).render(
        <FeedComponent {...feedtweetEl.dataset} />
    );
}

const tweetDetailEl = document.querySelectorAll(".tweet-detail");
if (tweetDetailEl) {
    tweetDetailEl.forEach(container => {
        ReactDOM.createRoot(container).render(
            <TweetDetailComponent {...container.dataset} />
        );
    });
}

const profileBadgeEl = document.querySelectorAll(".profile-badge");
if (profileBadgeEl){
    profileBadgeEl.forEach(container => {
        ReactDOM.createRoot(container).render(
            <ProfileBadgeComponent {...container.dataset}/>
            );
    });
    
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
