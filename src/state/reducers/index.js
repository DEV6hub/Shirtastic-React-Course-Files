
import shirts from './shirts';
import user from './user';

const rootReducer = (state, action) => ({
    shirts: shirts(state.shirts, action),
    user: user(state.user, action)
})

export default rootReducer;