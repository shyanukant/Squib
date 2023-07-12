import { BackendLookup } from "../lookup";

export function apiProfileDetail(username, callback){
    return BackendLookup('GET', `profile/${username}/`, callback)
}