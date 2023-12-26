import axios from 'axios';

export const fetchUser = () => {
    return async function (dispatch) {
        const res = await axios.get('/api/current_user');
        dispatch({ type: 'FETCH_USER', payload: res.data });
    };
};

export const addCredits = () => {
    return async function (dispatch) {
        const res = await axios.patch('/api/add-credits'); 
        // we will get the user with updated credits
        dispatch({ type: 'FETCH_USER', payload: res.data });
    };
}
// when reduxThunk sees that we are return a function, it automatically passes the dispatch function inside it and so we directly get the access to dispatch function.