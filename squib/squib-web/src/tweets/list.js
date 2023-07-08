import React from "react";
import { useState, useEffect } from "react";
import { Tweet } from "./tweet";
import { apiLoadTweets } from "./lookup";

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
            const handleTweetListLookup = (response, status) => {
                if (status === 200){
                    if (response.length > 0){

                        setTweets(response)
                    }
                }else {
                    alert("There was an error!!");
                }
            };
            apiLoadTweets(props.username, handleTweetListLookup);
        }
    }, [tweets, props.username]);
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