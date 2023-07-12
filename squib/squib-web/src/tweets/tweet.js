import React, {useEffect,useState} from "react";
import { UserPicture, UserDisplay} from "../profiles";
import { ActionBtn } from "./button";

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
        {isRetweet === true && <div className="mb-2"><span className="small text-muted">Retweet via <UserDisplay user={reTweeter} /> </span></div>}
        <div className="d-flex ">
        <div className="">
            <UserPicture user={tweet.user} />
        </div>
            <div className="col-11 ">
                <div>
                    <p>
                        <UserDisplay inCludeFullName user={tweet.user} />
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