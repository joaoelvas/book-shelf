import axios from 'axios';

export function getBooks(
    limit = 10,
    skip = 0,
    order = 'asc',
    list = null
) {
    const reqLink = `/api/books?limit=${limit}&skip=${skip}&order=${order}`;
    const req = axios.get(reqLink).then(res => {
        if(list) {
            return [...list,...res.data]
        } else {
            return res.data
        }
    })

    return {
        type: 'GET_BOOKS',
        payload: req
    }
}

export function getBookWithReviewer(id) {

    const req = axios.get(`/api/book?id=${id}`)

    return (dispatch) => {
        req.then(({data}) => {
            let book = data;
            
            axios.get(`/api/reviewer?id=${book.ownerId}`).then(({data}) => {
                let res = {
                    book, 
                    reviewer: data
                }

                dispatch({
                    type: 'GET_BOOK_WITH_REVIEWER',
                    payload: res
                })
            })
        })
    }
}

export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_WITH_REVIEWER',
        payload: {
            book: {},
            reviewer: {}
        }
    }
}

export function addBook(book) {
    const req = axios.post('/api/book',book).then(res => res.data);

    return {
        type: 'ADD_BOOK',
        payload: req
    }
}

export function clearNewBook() {
    return {
        type: 'CLEAR_NEW_BOOK',
        payload: null
    }
}

export function getUserPosts(userId) {

    const req = axios.get(`/api/user/posts?user=${userId}`).then(res => res.data);

    return {
        type: 'GET_USER_POSTS',
        payload: req
    }
}

export function getBook(id) {

    const req = axios.get(`/api/book?id=${id}`).then(res => res.data)

    return {
        type: 'GET_BOOK',
        payload: req
    }
}

export function updateBook(data) {

    const req = axios.put('/api/book', data).then(res => res.data);

    return {
        type: 'UPDATE_BOOK',
        payload: req
    }
}

export function deleteBook(id) {

    const req = axios.delete(`/api/book?id=${id}`).then(res => res.data);

    return {
        type: 'DELETE_BOOK',
        payload: req
    }

}

export function clearBook() {
    return {
        type: 'CLEAR_BOOK',
        payload: {
            book: null,
            updatebook: false,
            postdeleted: false
        }
    }
}

/*========= USER =========*/

export function loginUser({email,password}) {

    const req = axios.post('/api/user/login', {email,password}).then(res => res.data)

    return {
        type: 'USER_LOGIN',
        payload: req
    }
}

export function auth() {
    const req = axios.get('/api/auth').then(res => res.data);

    return {
        type: 'USER_AUTH',
        payload: req
    }
}

export function getUsers() {
    const req = axios.get('/api/users').then(res => res.data);

    return {
        type: 'GET_USERS',
        payload: req
    }
}

export function registerUser(user, userList) {

    const req = axios.post(`/api/user`, user)

    return (dispatch) => {
        req.then(({data}) => {
            let users = data.success ? [...userList,data.user]:userList
            let res = {
                success: data.success,
                users
            }

            dispatch({
                type: 'USER_REGISTER',
                payload: res
            })
        })
    }
}

