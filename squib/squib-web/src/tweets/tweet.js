import React, {useEffect,useState} from "react";
import { SlLike, SlDislike} from 'react-icons/sl';
import {AiOutlineRetweet} from "react-icons/ai"
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
    className = isRetweet === true ? `${className} px-6 py-4 border rounded` : className ;
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
            // setIsLike(true)
            console.log(newActionTweet)
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
        {isRetweet === true && <div className="mb-2"><span className="text-sm ">Retweet via <UserDisplay user={reTweeter} /> </span></div>}
        <div className="flex ">
        <div className="">
            <UserPicture user={tweet.user} />
        </div>
            <div className=" ">
                <div>
                    <p>
                        <UserDisplay inCludeFullName user={tweet.user} />
                    </p>
                    <p>{tweet.content}</p>
                    <ParentTweet tweet={tweet} reTweeter={tweet.user} />
                </div>
                <div className='my-2 flex align-middle'>
                    {actionTweet && hideAction !== true && (<React.Fragment>
                        
                        <ActionBtn
                            tweet={actionTweet}
                            didPerformAction={handlePerformAction}
                            action= "like" 
                            display = {<SlLike/>}
                            />

                        <ActionBtn
                            tweet={actionTweet}
                            didPerformAction={handlePerformAction}
                            action= "unlike"
                            display= {<SlDislike/> }
                            />

                        <ActionBtn
                            tweet={actionTweet}
                            didPerformAction={handlePerformAction}
                            action="retweet"
                            display= { <AiOutlineRetweet/> }/>
                    </React.Fragment>)}

                    {isDetail === true ? null : <button onClick={handleLink} className="bg-indigo-500 shadow-lg shadow-indigo-500/50 px-4 py-2 rounded-xl text-white hover:bg-indigo-600 text-xs">View</button>}
                </div>
            </div>
        </div>
    </div>
}