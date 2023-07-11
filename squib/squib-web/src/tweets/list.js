import React from "react";
import { useState, useEffect } from "react";
import { Tweet } from "./tweet";
import { apiLoadTweets } from "./lookup";

export function TweetList(props) {
    // console.log(1, props.newTweets)
    const [tweets, setTweets] = useState([])
    const [nextUrl, setNextUrl] = useState(null)
    useEffect(() => {
        if (props.newTweets.length > 0){
            setTweets((prevTweets) => [...props.newTweets, ...prevTweets])
        }
    }, [props.newTweets]);

    useEffect(() => {
        if (tweets.length === 0){
            const handleTweetListLookup = (response, status) => {
                if (status === 200){
                    if (response.results.length > 0){

                        setTweets(response.results)
                        setNextUrl(response.next)
                    }
                }else {
                    alert("There was an error!!");
                }
            };
            apiLoadTweets(props.username, handleTweetListLookup);
        }
    }, [tweets, props.username]);
    console.log(tweets)

    const handleDidRetweet = (newRetweet) => {
        setTweets((prevTweets) => [newRetweet, ...prevTweets]);
    };

    const handleLoadNext = (event) => {
        event.preventDefault();
        if (nextUrl !== null) {
            const handleLoadNextResponse = (response, status) => {
                if (status === 200){
                    setTweets([...tweets, ...response.results])
                    setNextUrl(response.next)
                } else {
                alert("There was an error!!");
            }
            };
            apiLoadTweets(props.username, handleLoadNextResponse, nextUrl)
        }
    }

    return <React.Fragment> {tweets.map((item, index) => {
        return <Tweet
            key={`${index}-{item.id}`}
            tweet={item}
            didRetweet={handleDidRetweet}
            className='my-5 py-5 border bg-white text-dark' />
    })};
    { nextUrl !== null && <button className="btn btn-outline-primary" onClick={handleLoadNext}>Load Next</button>}
    </React.Fragment>
}