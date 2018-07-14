import React from 'react'

function User(props) {

    let userInfo = props.user.login;

    return (
        <div className="user_container">
            <div className="avatar">
                <img alt="avatar" src="/images/avatar.png" />
            </div>
            <div className="nfo">
                <div><span>Name:</span> {userInfo.name}</div>
                <div><span>Lastname:</span> {userInfo.lastname}</div>
                <div><span>Email:</span> {userInfo.email}</div>
            </div>
        </div>
    )
}

export default User
