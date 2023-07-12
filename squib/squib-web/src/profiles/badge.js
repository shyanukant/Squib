import React, {useEffect, useState} from "react";
import { apiProfileDetail } from "./lookup";

export function ProfileBadgeComponent(props){
    const {username} = props
    const [profile, setProfile] = useState(null)
    const [didLookup, setDidLookup] = useState(false)

    const handleProfileDetail = (response, status) =>{
        if (status === 200){
            setProfile(response)
        } else{
            alert("There was a error finding this profile ")
        }
    }

    useEffect(() => {
        if (didLookup ===  false){
            apiProfileDetail(username, handleProfileDetail)
            setDidLookup(true)
        }
    }, [ username, didLookup, setDidLookup ])
    return didLookup === false ? "Loading..." : profile ? <span>{profile.first_name}</span> : null
}
