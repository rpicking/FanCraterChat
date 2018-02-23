import {
    LOGIN_SUCCESS, 
    LOGIN_FAIL
} from './types';
import { sbConnect } from '../sendbirdActions';

export const sendbirdLogin = ({ userId, password }) => {
    return (dispatch) => {
        sbConnect(userId, password)
        .then((user) => {
            dispatch({
                type: LOGIN_SUCCESS, 
                payload: user 
            })
        })
        .catch((error) => {
            dispatch({ 
                type: LOGIN_FAIL,
                payload: error
            })
        });
    }
}