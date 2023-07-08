import { BackendLookup } from "../lookup";

export function apiCreateTweet(newTweets, callback) {
    BackendLookup('POST', 'tweets/create/', callback, { content: newTweets })
    }
export function apiActionTweet(tweetId, action, callback){
    let data = { id : tweetId, action : action }
    BackendLookup('POST', 'tweets/action/', callback, data)
}
    
export function apiLoadTweets(callback) {
    BackendLookup('GET', 'tweets/', callback)
    }