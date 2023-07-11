import React from "react";
import { useState, useEffect } from "react";
import { ActionBtn } from "./button";
// tweet container ->

export function ParentTweet(props) {
    const { tweet } = props
    return tweet.parent ? <Tweet hideAction isRetweet reTweeter={props.reTweeter} className={''} tweet={tweet.parent}  /> : null
}

export function Tweet(props) {
    const { tweet, didRetweet, hideAction, isRetweet, reTweeter } = props;
    const [actionTweet, setActionTweet] = useState(tweet ? tweet : null)
    let className = props.className ? props.className : ' mx-auto'
    className = isRetweet === true ? `${className} p-2 border rounded` : className ;
    // tweet detail 
    const path = window.location.pathname
    const match = path.match(/(?<tweetId>\d+)/)
    const urlTweetId = match ? match.groups.tweetId : -1
    const isDetail = `${tweet.id}` === `${urlTweetId}`

    // update actionTweet when tweet update 
    useEffect(() => {
        setActionTweet(tweet);
    }, [tweet]);

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

    const handleLink = (event) => {
        event.preventDefault();
        window.location.href = `/${tweet.id}`;
    }

    return <div className={className}>
        {isRetweet === true && <div className="mb-2"><span className="small text-muted">Retweet via @{reTweeter.username}</span></div>}
        <div className="d-flex ">
            <div className="">
                <span className="border rounded-circle bg-dark text-white px-3 py-2 mx-1">{tweet.user.first_name[0]}</span>
            </div>
            <div className="col-11 ">
                <div>
                    <p>
                        {tweet.user.first_name}{" "}
                        {tweet.user.last_name}{" "}
                        @{tweet.user.username}
                    </p>
                    <p>{tweet.content}</p>
                    <ParentTweet tweet={tweet} reTweeter={tweet.user} />
                </div>
                <div className='btn btn-group px-0'>
                    {actionTweet && hideAction !== true && (<React.Fragment>
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
                    </React.Fragment>)}

                    {isDetail === true ? null : <button onClick={handleLink} className="btn btn-outline-primary btn-sm">View</button>}
                </div>
            </div>
        </div>
    </div>
}