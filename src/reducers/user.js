import {CREATE_USER } from '../constants/ActionTypes';


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
        default: 
            return state;
    }
}