import React from "react";
// tweet container ->

export function UserLink(props){
    const {username} = props
    const handleUserLink = (event) =>{
        window.location.href = `/profile/${username}`
    }
    return <span className="font-light cursor-pointer" onClick={handleUserLink}>
        {props.children}

    </span>
}
export function UserPicture(props){
    const {user, hidelink, className} = props
    const picClassName = "rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 text-white px-3 py-2 mx-1"

    const userPicSpan = <span className={className ? className +picClassName : picClassName}>{user.first_name[0]}</span>
    return hidelink ? `@${user.name}` : <UserLink username={user.username}> 
            {userPicSpan}
        </UserLink>
}

export function UserDisplay(props){
    const {user, inCludeFullName, hideLink, className} = props
    const nameDisplay = inCludeFullName === true ? <h3 className= {className}>{(user.first_name)} {user.last_name} </h3> : null
    const userDisplaySpan = <span className="font-light">@{user.username}</span>

    return <React.Fragment>
        { nameDisplay }
        { hideLink ? userDisplaySpan : <UserLink username={user.username}>{userDisplaySpan}</UserLink> }

    </React.Fragment>
}