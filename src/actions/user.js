export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export function receiveLogin(payload) {
    return async dispatch => {
        localStorage.setItem('authenticated', false);
        function onSuccess(success) {
            dispatch(success);
            return success;
        }
        function onError(error) {
            dispatch(error);
            return error;
        }
        try {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Origin': 'http://localhost:3000',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                body: JSON.stringify({ username: 'LURM', password: 'password' })
            };
            debugger
            let response = await fetch("http://localhost:8090/authenticate", requestOptions).then((response) => response.json());
            console.log(response);
            if (response?.token) {
                localStorage.setItem('authenticated', true);
                localStorage.setItem('token', response.token);
            }
            return onSuccess({
                type: LOGIN_SUCCESS
            });
        } catch (error) {
            return onError({
                type: LOGIN_FAILURE
            });
        }
    }
}

function loginError(payload) {
    return {
        type: LOGIN_FAILURE,
        payload,
    };
}

function requestLogout() {
    return {
        type: LOGOUT_REQUEST,
    };
}

export function receiveLogout() {
    return {
        type: LOGOUT_SUCCESS,
    };
}

// Logs the user out
export function logoutUser() {
    return (dispatch) => {
        dispatch(requestLogout());
        localStorage.removeItem('authenticated');
        dispatch(receiveLogout());
    };
}

export function loginUser(creds) {
    return (dispatch) => {
        if (creds.email.length > 0 && creds.password.length > 0) {
            debugger
            dispatch(receiveLogin(creds));
        } else {
            dispatch(loginError('Something was wrong. Try again'));
        }
    }
}
