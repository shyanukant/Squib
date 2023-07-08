import React from "react";
import { apiActionTweet } from "./lookup";

export function ActionBtn(props) {
    const { tweet, didPerformAction, action } = props ;
    const likes = tweet.likes ? tweet.likes : 0;

    const className = props.className ? props.className : 'btn btn-primary'
    const dsiplay = action.type === "like" ? `${likes} ${action.display}` : action.display;

    const handleActionBackendEvent = (response, status) => {
        // console.log(response, status)
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