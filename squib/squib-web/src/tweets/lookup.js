import { BackendLookup } from "../lookup";

export function createTweet(newTweets, callback) {
    BackendLookup('POST', 'tweets/create/', callback, { content: newTweets })
    }
export function actionTweet(tweetId, action, callback){
    let data = { id : tweetId, action : action }
    BackendLookup('POST', 'tweets/action/', callback, data)
}
    
export function loadTweets(callback) {
    BackendLookup('GET', 'tweets/', callback)
    }