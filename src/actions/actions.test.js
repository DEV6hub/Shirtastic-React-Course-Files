import * as actions from './';
import * as types from '../constants/ActionTypes'
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


describe('actions', () => {
    it('should create an action to add a shirt', () => {
        const shirt = {};
        const expectedActon =  {
            type: types.CREATE_SHIRT,
            shirt
        }
        expect(actions.createShirt(shirt)).toEqual(expectedActon);
    }) 

})

describe ('async actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    })
    it ('creates REQUEST_SHIRTS_SUCCESS when sucessfuly fetching shirts', () => {
        fetchMock.get('http://localhost:9001/shirts', { body: { shirts : []}})
        const expectedActions = [
            {type: types.REQUEST_SHIRTS},
            {type: types.REQUEST_SHIRTS_SUCCESS, response: {shirts: []}}
        ];
        const store = mockStore({shirts: []});
        return store.dispatch(actions.fetchShirts()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        })
    })
})