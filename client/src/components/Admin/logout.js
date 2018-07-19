import React from 'react';
import axios from 'axios';

const Logout = (props) => {

    // eslint-disable-next-line
    let req = axios.get(`/api/user/logout`).then(req => {
        setTimeout(() => {
            props.history.push('/')
        }, 2000)
    })

    return (
        <div className="logout_container">
            <h1>
                Sorry to see you go :(
            </h1>
        </div>
    );
};

export default Logout;