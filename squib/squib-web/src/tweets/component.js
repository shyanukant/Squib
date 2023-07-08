import React from "react";
import { useState, useEffect } from "react";
import { apiCreateTweet} from "./lookup";
import { TweetList } from "./list";

export function TweetComponent(props) {
    // console.log(props)
    const [newTweets, setNewTweets] = useState([])
    const textAreaRef = React.createRef()
    const canTweet = props.canTweet === "false" ? false : true

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
        { canTweet === true && <div className="col-12 my-5 ">
            <form onSubmit={handleSubmit}>
                <textarea className="form-control" name="message" ref={textAreaRef} required={true}></textarea><br />
                <button className="btn btn-primary" name="Tweet" >Tweet</button>
            </form>
        </div>
        }
        <TweetList newTweets={newTweets} {...props} />
    </div>
}