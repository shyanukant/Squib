import React from "react";
import { useState, useEffect } from "react";
import { apiActionTweet, apiCreateTweet, apiLoadTweets } from "./lookup";

export function TweetCoponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()

    const handleNewTweet = (newTweet, status) => {
        // backend api response 
        // console.log(newTweet, status)
        if (status === 201) {
            setNewTweets([newTweet, ...newTweets])
        } else {
            alert("The error occurred, Please try again later!!")
            console.log(newTweet)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        const newValue = textAreaRef.current.value
        // create tweet in server  - backend api reqest
        apiCreateTweet(newValue, handleNewTweet)
        textAreaRef.current.value = '';
    }

    useEffect(() => {
        if (newTweets.length !== 0){
            setNewTweets([]);
        }
    }, [newTweets])

    return <div className={props.className}>
        <div className="col-12 my-5 ">
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" name="message" ref={textAreaRef} required={true}></textarea><br />
                <button className="btn btn-primary" name="Tweet" >Tweet</button>
            </form>
        </div>
        <TweetList newTweets={newTweets} />
    </div>
}

export function ActionBtn(props) {
    const { tweet, didPerformAction, action } = props ;
    const likes = tweet.likes ? tweet.likes : 0;

    const className = props.className ? props.className : 'btn btn-primary'
    const dsiplay = action.type === "like" ? `${likes} ${action.display}` : action.display;

    const handleActionBackendEvent = (response, status) => {
        console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    };

    const handleClick = (event) => {
        event.preventDefault()
        apiActionTweet(tweet.id, action.type, handleActionBackendEvent);
    }
    return <button className={className} onClick={handleClick}> {dsiplay}</button>
}
// tweet container -> conatain content and buttons 

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

export function TweetList(props) {
    // console.log(1, props.newTweets)
    const [tweets, setTweets] = useState([])
    useEffect(() => {
        if (props.newTweets.length > 0){
            setTweets((prevTweets) => [...props.newTweets, ...prevTweets])
        }
    }, [props.newTweets]);

    useEffect(() => {
        if (tweets.length === 0){
            const myCallback = (response, status) => {
                if (status === 200){
                    if (response.length > 0){

                        setTweets(response)
                    }
                }else {
                    alert("There was an error!!");
                }
            };
            apiLoadTweets(myCallback);
        }
    }, [tweets]);
    // console.log(tweets)

    const handleDidRetweet = (newRetweet) => {
        setTweets((prevTweets) => [newRetweet, ...prevTweets]);
    };

    return tweets.map((item, index) => {
        return <Tweet
            key={`${index}-{item.id}`}
            tweet={item}
            didRetweet={handleDidRetweet}
            className='my-5 py-5 border bg-white text-dark' />
    });
}