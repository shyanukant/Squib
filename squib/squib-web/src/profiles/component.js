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
    const {user} = props
    return <UserLink username={user.username}>
        <span className="border rounded-circle bg-dark text-white px-3 py-2 mx-1">{user.first_name[0]}</span>
        </UserLink>
}

export function UserDisplay(props){
    const {user, inCludeFullName} = props
    const nameDisplay = inCludeFullName === true ? `${user.first_name} ${user.last_name}` : null

    return <React.Fragment>
        { nameDisplay }
        <UserLink username={user.username}><span>@{user.username}</span></UserLink>

    </React.Fragment>
}