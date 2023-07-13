import React from "react";
import { useState, useEffect } from "react";
import { Tweet } from "./tweet";
import { apiFeedTweets } from "./lookup";

export function FeedList(props) {
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
            apiFeedTweets(handleTweetListLookup);
        }
    }, [tweets, props.username]);

    const handleDidRetweet = (newRetweet) => {
        setTweets((prevTweets) => [newRetweet, ...prevTweets]);
    };

    const handleLoadNext = (event) => {
        event.preventDefault();
        if (nextUrl !== null) {
            const handleLoadNextResponse = (response, status) => {
                if (status === 200){
                    setTweets([...tweets, ...response.results])
                    setNextUrl(response.next) }
            //     } else {
            //     alert("There was an error!!");
            // }
            };
            apiFeedTweets(handleLoadNextResponse, nextUrl)
        }
    }

    return <React.Fragment> {tweets.map((item, index) => {
        return <Tweet
            key={`${index}-{item.id}`}
            tweet={item}
            didRetweet={handleDidRetweet}
            className='my-5 py-5 border-2 ' />
    })};
    { nextUrl !== null && <button className="bg-violet-500 text-white py-2 px-4 shadow-lg shadow-violet-300 hover:bg-violet-600 rounded-xl" onClick={handleLoadNext}>Load Next</button>}
    </React.Fragment>
}