import React from "react";
import { apiActionTweet } from "./lookup";

export function ActionBtn(props) {
    const { tweet, didPerformAction, action, display } = props ;
    const likes = tweet.likes ? tweet.likes : 0;

    const actionDisplay = action === "like" ? <span className="flex"> {likes} {display} </span> : display;
    // const actionDisplay = action.type === "like" ? display : action.dsiplay;

    const handleActionBackendEvent = (response, status) => {
        // console.log(response, status)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    };

    const handleClick = (event) => {
        event.preventDefault()
        apiActionTweet(tweet.id, action, handleActionBackendEvent);
    }
    return <button className="mr-6" onClick={handleClick}> {actionDisplay}</button>
}