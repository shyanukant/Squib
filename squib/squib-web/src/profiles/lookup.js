import { BackendLookup } from "../lookup";

export function apiProfileDetail(username, callback){
    return BackendLookup('GET', `profile/${username}/`, callback)
}

export function apiFollowToggle(username, action, callback){
    const data = {action : `${ action && action}`.toLowerCase()}
    return BackendLookup("POST", `profile/${username}/follow/` , callback, data)
}