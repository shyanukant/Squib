import React from "react";
import { useState, useEffect } from "react";
import loadTweets from "../lookup";

// action -> like and unlike 


export function TweetCoponent(props) {
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log(event)
        const newValue = textAreaRef.current.value
        let tempTweet = [...newTweets]
        tempTweet.unshift(
            {content : newValue, 
            lkes : 0, 
            id : 3333533})
        setNewTweets(tempTweet)
        textAreaRef.current.value = ''
    }

    return <div className={props.className}>
        <div className="col-12 my-5 ">
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" name="message" ref={textAreaRef} required={true}></textarea><br />
                <button className="btn btn-primary" name="Tweet" >Tweet</button>
            </form>
        </div>
        <TweetList newTweets = {newTweets}/>
    </div>
}

export function ActionBtn(props) {
    const { tweet, action } = props
    const [userclick, setUserClick] = useState(tweet.userclick === true ? true : false)
    const [likes, setLike] = useState(tweet.likes ? tweet.likes : 0)

    const className = props.className ? props.className : 'btn btn-primary'
    const dsiplay = action.type === "like" ? `${likes} ${action.display}` : action.display

    const handleAction = (event) => {
        event.preventDefault()
        if (action.type === "like") {
            if (userclick === true) {
                setLike(likes - 1)
                setUserClick(false)

            } else if (userclick === false) {
                setLike(likes + 1)
                setUserClick(true)
            }
        }
    }

    return <button className={className} onClick={handleAction}> {dsiplay}</button>
}
// tweet container -> conatain content and buttons 
export function Tweet(props) {
    const { tweet } = props
    return <div className={props.className}>
        <p>{tweet.id} - {tweet.content}</p>
        <div className='btn btn-group'>
            <ActionBtn tweet={tweet} action={{ type: "like", display: "Like" }} />
            <ActionBtn tweet={tweet} className="btn btn-danger" action={{ type: "unlike", display: "Unlike" }} />
            <ActionBtn tweet={tweet} className="btn btn-success" action={{ type: "retweet", display: 'Retweet' }} />
        </div>
    </div>
}

export function TweetList(props) {
    console.log(props.newTweets)
    const [tweets, setTweets] = useState([])
    const [tweetsInit, setTweetsInit] = useState([])

    useEffect(() => {
        let final = [...props.newTweets].concat(tweetsInit)
        if (final.length !== tweets.length){
            setTweets(final)
        }
    }, [props.newTweets, tweets, tweetsInit])

    useEffect(() => {
        function myCallback(response, status) {
            // console.log(response, status)
            if (status === 200) {
                setTweetsInit(response)
            } else {
                alert("There was an error!!")
            }
        }
        loadTweets(myCallback)
    }, [])

    return tweets.map((item, index) => {
        return <Tweet tweet={item} key={`${index}-{item.id}`} className='my-5 py-5 border bg-white text-dark' />
        // return <li>{tweet.content}</li>
    })
}