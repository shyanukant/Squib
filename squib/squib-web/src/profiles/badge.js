import React, {useEffect, useState} from "react";
import { apiProfileDetail, apiFollowToggle } from "./lookup";
import { UserDisplay, UserPicture } from "./component";


export function ProfileBadge(props){
    const {user, didFollowToggle, profileLoading} = props
    let currentFollowStatus = (user && user.is_following) ? "Unfollow" : "Follow"
    currentFollowStatus = profileLoading ? "Loading..." : currentFollowStatus

    const handleBadgeBtn = (event) => {
        event.preventDefault()
        if (didFollowToggle && !profileLoading){
            didFollowToggle(currentFollowStatus)
        }
    }

    return user ? <div>
        <UserPicture user={user} hideLink/> 
        <p><UserDisplay user={user} inCludeFullName hideLink /></p>
        <button className="btn btn-primary"
        onClick={handleBadgeBtn}>
            {currentFollowStatus}
            </button>
        </div> : null
}

export function ProfileBadgeComponent(props){
    const {username} = props
    const [profile, setProfile] = useState(null)
    const [didLookup, setDidLookup] = useState(false)
    const [profileLoading, setProfileLoading] = useState(false)

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

    const handleFollowToggle = (actionVerb) =>{
        console.log(actionVerb)
        apiFollowToggle(username, actionVerb, (response, status) => {
            console.log(response, status)
            if (status===200){
                setProfile(response)
            }
            setProfileLoading(false)               
        })
        setProfileLoading(true)               
    }

    return didLookup === false ? "Loading..." : profile ? <ProfileBadge
     user = {profile} 
     didFollowToggle = {handleFollowToggle} 
     profileLoading = {profileLoading} /> : null
}
