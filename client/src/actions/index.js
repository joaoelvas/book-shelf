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