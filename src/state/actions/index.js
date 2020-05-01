import * as types from '../../constants/ActionTypes';
import axios from 'axios';

export const createShirt = shirt => ({
    type: types.CREATE_SHIRT, 
    shirt
});

export const deleteShirt = id => ({
    type: types.DELETE_SHIRT,
    id
});

export const updateShirt = (id, shirt) => ({
    type: types.UPDATE_SHIRT, 
    id, 
    shirt
});

export const requestShirts = () => ({
    type: types.REQUEST_SHIRTS
});

export const requestShirtsSuccess = (response) => ({
    type: types.REQUEST_SHIRTS_SUCCESS, 
    response
});

export const requestShirtsFailure = (error) => ({
    type: types.REQUEST_SHIRTS_FAILURE, 
    error
});
export const createdUser = (response) => ({
    type: types.CREATE_USER,
    response
});


// This action is a thunk, doesn't return an object, returns a function that can trigger side-effects (http requests)
// when our async fetch returns, we dispatch the appropriate actions
export const fetchShirts = () => {
    return dispatch => {
        dispatch(requestShirts())
        return fetch('http://localhost:9001/shirts')
        .then(response => response.json())
        .then(
            json => dispatch(requestShirtsSuccess(json)), 
            error => dispatch(requestShirtsFailure(error))
        )
    }

}

export const createUser = (data) => {
    return dispatch => {
        return axios({
            method: 'post',
            url: 'http://localhost:9000/userInfo',
            data: data
        })
        .then(response => {
            console.log(response);
            dispatch(createdUser(response.data));
        })
        .catch(error => {
            console.log(error);
        });
    }
}