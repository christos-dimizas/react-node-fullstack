import axios from 'axios';
import {FETCH_USER} from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
};

// On Redux a react component calls for an action. This action is created from an Action Creator process
// which produces the relative action.
// Redux-thunk allows us to manually dispatch an action rather than waiting to be dispatched from the Action Creator.