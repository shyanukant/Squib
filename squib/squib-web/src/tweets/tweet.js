import React from "react";
import { useState, useEffect } from "react";
import { ActionBtn } from "./button";
// tweet container ->

export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent ? <div className="row">
        <div className="col-11 mx-auto p-3 border rounded">
            <p className="text-muted small mb-0">Retweet</p>
            <Tweet hideAction className={''} tweet={tweet.parent} />
        </div>
    </div> : null
}

export function Tweet(props) {
    const { tweet, didRetweet, hideAction } = props;
    const [actionTweet, setActionTweet] = useState(tweet?tweet : null)

    // update actionTweet when tweet update 
    useEffect(() => {
        setActionTweet(tweet);
    },[tweet]);

    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {

            setActionTweet(newActionTweet);
        } else if (status === 201) {
            // add new RetweetAction to the list of tweet on server side here...
            if (didRetweet) {
                didRetweet(newActionTweet);
            }
        }
    };
    return <div className={props.className}>
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        {actionTweet && hideAction !== true && (<div className='btn btn-group'>
            <ActionBtn
                tweet={actionTweet}
                didPerformAction={handlePerformAction}
                action={{ type: "like", display: "Like" }} />

            <ActionBtn
                tweet={actionTweet}
                didPerformAction={handlePerformAction}
                className="btn btn-danger"
                action={{ type: "unlike", display: "Unlike" }} />

            <ActionBtn
                tweet={actionTweet}
                didPerformAction={handlePerformAction}
                className="btn btn-success"
                action={{ type: "retweet", display: 'Retweet' }} />
        </div>
        )}
    </div>
}