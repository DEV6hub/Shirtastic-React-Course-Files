import * as types from '../constants/ActionTypes';

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