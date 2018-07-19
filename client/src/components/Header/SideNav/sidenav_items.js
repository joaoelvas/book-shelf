import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';

const SideNavItems = ({user}) => {
    
    const items = [
        {
            type:'navItem',
            icon:'home',
            text:'Home',
            link:'/',
            restricted: false
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My Profile',
            link:'/user',
            restricted: true
        },        
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add admins',
            link:'/user/register',
            restricted: true
        },
        {
            type:'navItem',
            icon:'sign-in',
            text:'Login',
            link:'/login',
            restricted: false,
            exclude: true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'My reviews',
            link:'/user/reviews',
            restricted: true
        },
        {
            type:'navItem',
            icon:'file-text-o',
            text:'Add reviews',
            link:'/user/reviews/add',
            restricted: true
        },
        {
            type:'navItem',
            icon:'sign-out',
            text:'Logout',
            link:'/user/logout',
            restricted: true
        }
    ]

    const element = (item,i) => (
        <div key={i} className={item.type}>
            <Link to={item.link}>
                <FontAwesome name={item.icon} />
                {item.text}
            </Link>
        </div>
    )

    const showItems = () => (
        user.login ?
            items.map((item,i) => {
                if(user.login.isAuth) {
                    return !item.exclude ? 
                        element(item,i)
                    : null
                } else {
                    return !item.restricted ?
                        element(item,i)
                    : null
                }
                // return element(item,i);
            })
        : null
    )
    
    return (
        <div>
            {showItems()}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(SideNavItems);