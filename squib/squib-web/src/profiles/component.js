import React from "react";
// tweet container ->

export function UserLink(props){
    const {username} = props
    const handleUserLink = (event) =>{
        window.location.href = `/profile/${username}`
    }
    return <span className="pointer" onClick={handleUserLink}>
        {props.children}

    </span>
}
export function UserPicture(props){
    const {user, hidelink} = props
    const userPicSpan = <span className="border rounded-circle bg-dark text-white px-3 py-2 mx-1">{user.first_name[0]}</span>
    return hidelink ? `@${user.name}` : <UserLink username={user.username}> 
            {userPicSpan}
        </UserLink>
}

export function UserDisplay(props){
    const {user, inCludeFullName, hideLink} = props
    const nameDisplay = inCludeFullName === true ? `${user.first_name} ${user.last_name} ` : null
    const userDisplaySpan = <span>@{user.username}</span>

    return <React.Fragment>
        { nameDisplay }
        { hideLink ? userDisplaySpan : <UserLink username={user.username}>{userDisplaySpan}</UserLink> }

    </React.Fragment>
}