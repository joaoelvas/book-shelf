import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions'
import moment from 'moment-js';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';

class UserPosts extends Component {

    componentWillMount() {
        this.props.getUserPosts(this.props.user.login.id)
    }

    showUserPosts = (user) => (
        user.userPosts ?
            user.userPosts.map((item,i) => (
                <tr key={i}>
                    <td><Link to={
                        `/user/reviews/edit/${item._id}`
                    }>
                        {item.name}
                    </Link></td>
                    <td>{item.name}</td>
                    <td>
                        {moment(item.createdAt).format("DD/MM/YY")}
                    </td>
                </tr>
            )) : null
    )

    render() {
        console.log(this.props)
        let user = this.props.user;
        return (
            <div className="user_posts">
                <h4>Your reviews:</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(user)}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getUserPosts
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPosts);