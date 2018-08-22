import {CREATE_USER, GET_USER } from '../constants/ActionTypes';


export default function user(
    state = {
        user: {
        }
    }, 
    action
) {
    switch(action.type) {
        case CREATE_USER:
            return {
                ...state,
                user: action.response
            };
        case GET_USER:
            return state.user;
        default: 
            return state;
    }
}