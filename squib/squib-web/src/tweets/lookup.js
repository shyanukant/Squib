import { BackendLookup } from "../lookup";

export function apiCreateTweet(newTweets, callback) {
    BackendLookup('POST', 'tweets/create/', callback, { content: newTweets })
    }
export function apiActionTweet(tweetId, action, callback){
    let data = { id : tweetId, action : action }
    BackendLookup('POST', 'tweets/action/', callback, data)
}
    
export function apiLoadTweets(username , callback, nextUrl) {
    let endpoint = 'tweets/'
    if (username){
        endpoint = `tweets/?username=${username}`
    }
    if (nextUrl !== null && nextUrl !== undefined){
        endpoint = nextUrl.replace("http://localhost:8000/api/", "")
    }
    BackendLookup('GET', endpoint , callback)
    }

export function apiTweetDetail(tweetId, callback){
    BackendLookup('GET', `tweets/${tweetId}/`, callback)
}