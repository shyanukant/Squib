import { BackendLookup } from "../lookup";

export function apiCreateTweet(newTweets, callback) {
    BackendLookup('POST', 'tweets/create/', callback, { content: newTweets })
    }
export function apiActionTweet(tweetId, action, callback){
    let data = { id : tweetId, action : action }
    BackendLookup('POST', 'tweets/action/', callback, data)
}
    
export function apiLoadTweets(username , callback) {
    let endpoint = 'tweets/'
    if (username){
        endpoint = `tweets/?username=${username}`
    }
    BackendLookup('GET', endpoint , callback)
    }

export function apiTweetDetail(tweetId, callback){
    BackendLookup('GET', `tweets/${tweetId}/`, callback)
}