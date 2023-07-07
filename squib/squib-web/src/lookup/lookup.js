import { lookup } from "./component"

export function createTweet(newTweets, callback) {
    lookup('POST', 'tweets/create/', callback, { content: newTweets })
  }
  
  export function loadTweets(callback) {
    lookup('GET', 'tweets/', callback)
  }