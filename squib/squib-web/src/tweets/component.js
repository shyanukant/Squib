import React from "react";
import { useState, useEffect } from "react";
import { loadTweets, createTweet, actionTweet } from "./lookup";

// action -> like and unlike 


export function TweetCoponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()

    const handleNewTweet = (newTweet, status) => {
        // backend api response 
        console.log(newTweet, status)
        if (status === 201) {
            let tempTweet = [...newTweets]
            tempTweet.unshift(newTweet)
            setNewTweets(tempTweet)
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
        createTweet(newValue, handleNewTweet)

        textAreaRef.current.value = ''
    }

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
    const { tweet, action, didPerformAction } = props
    const likes = tweet.likes ? tweet.likes : 0

    const className = props.className ? props.className : 'btn btn-primary'
    const dsiplay = action.type === "like" ? `${likes} ${action.display}` : action.display

    const handleActionBackendEvent = (response, status) => {
        console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    }

    const handleClick = (event) => {
        event.preventDefault()
        actionTweet(tweet.id, action.type, handleActionBackendEvent)


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
    const { tweet, didRetweet, hideAction } = props
    const [actionTweet, setActionTweet] = useState(props.tweet ? props.tweet : null)

    const handlePerformAction = (newActionTweet, status) => {
        if (status === 200) {

            setActionTweet(newActionTweet)
        } else if (status === 201) {
            // add new RetweetAction to the list of tweet on server side here...
            if (didRetweet) {
                didRetweet(newActionTweet)
            }
        }
    }
    console.log(actionTweet)
    return <div className={props.className}>
        <div>
            <p>{tweet.id} - {tweet.content}</p>
            <ParentTweet tweet={tweet} />
        </div>
        { (actionTweet && hideAction !== true) && <div className='btn btn-group'>
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
        }
    </div>
}

export function TweetList(props) {
    console.log(props.newTweets)
    const [tweets, setTweets] = useState([])
    const [tweetsInit, setTweetsInit] = useState([])
    const [tweetsDidSet, setTweetsDidSet] = useState(false)

    useEffect(() => {
        let final = [...props.newTweets].concat(tweetsInit)
        if (final.length !== tweets.length) {
            setTweets(final)
        }
    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() => {
        if (tweetsDidSet === false) {
            function myCallback(response, status) {
                // console.log(response, status)
                if (status === 200) {
                    setTweetsInit(response)
                    setTweetsDidSet(true)
                } else {
                    alert("There was an error!!")
                }
            }
            loadTweets(myCallback)
        }
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet])

    const handleDidRetweet = (newRetweet) => {
        const updateTweetsInit = [...tweetsInit]
        updateTweetsInit.unshift(newRetweet)
        setTweetsInit(updateTweetsInit)

        const finalTweetsInit = [...tweets]
        finalTweetsInit.unshift(tweets)
        setTweets(finalTweetsInit)
    }

    return tweets.map((item, index) => {
        return <Tweet
            didRetweet={handleDidRetweet}
            tweet={item}
            key={`${index}-{item.id}`}
            className='my-5 py-5 border bg-white text-dark' />
        // return <li>{tweet.content}</li>
    })
}