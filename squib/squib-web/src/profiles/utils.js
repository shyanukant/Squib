import React from "react";
import numeral from "numeral"

export function DisplayCount(props) {
    return <span className={props.className}>{numeral(props.children).format('0a')}</span>
}

export function DisplayFollowInfo(props) {
    const { user, className } = props
    return < sapn > <DisplayCount>
        {user.follower_count}
    </DisplayCount>{user.following_count === 1 ? <span className={className}> Follower </span> :
        <span className={className} > Followers </span>
        }
        <DisplayCount>{user.following_count}</DisplayCount> <span className={className} > Followering</span>
    </sapn >
}