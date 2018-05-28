import reducer from './shirts';
import * as types from '../constants/ActionTypes';

describe('shirts reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            fetchingShirts: false,
            shirtList: []
        })
    })

    it('should handle REQUEST_SHIRTS_SUCCESS', () => {
        expect(
            reducer([], {
                type: types.REQUEST_SHIRTS_SUCCESS,
                response: []
            })
        ).toEqual({
            fetchingShirts: false,
            shirtList: []
        })
    })
})