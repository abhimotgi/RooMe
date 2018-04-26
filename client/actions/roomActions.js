import authenticatedRequest from '../utils/authenticatedRequest';

export const LOGIN_FUL = 'LOGIN_FUL';
export const LOGIN_REJ = 'LOGIN_REJ';

export const REGISTER_FUL = 'REGISTER_FUL';
export const REGISTER_REJ = 'REGISTER_REJ';

export const LOGOUT_FUL = 'LOGOUT_FUL';

// in this section, we're defining our synchronous action creators

function receiveLogin(token) {
  return {
    type: LOGIN_FUL,
    token: token,
    message: 'You have logged in successfully',
  };
}


function loginError(message) {
  return {
    type: LOGIN_REJ,
    error: message,
  };
}


function registerSuccess(token) {
  return {
    type: REGISTER_FUL,
    token: token,
    message: 'You have registered and are now logged in',
  };
}


function registerError(message) {
  return {
    type: REGISTER_REJ,
    error: message,
  };
}


export function getRooms() {
    let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      } // this line is important, if this content-type is not set it wont work
  };
  return dispatch => fetch('/api/getRooms', )
}

export function createRoom(info) {
  let config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }, // this line is important, if this content-type is not set it wont work
      body: JSON.stringify(info),
  };
  return dispatch => fetch('/api/createRoom', config)
    .then(response => response.json())
    .then((res) => {
      if (!res.success) {
        dispatch(registerError(res.message));
        return Promise.reject(res.message);
      } else {
        localStore.setItem('token', res.token);
        dispatch(registerSuccess(res.token));
      }
    })
    .catch(err => dispatch(registerError(err)));
}

export function loginRoom(info) {
  // config is what 'fetch' will use to configure its request
  let config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    }, // this line is important, if this content-type is not set it wont work
    body: JSON.stringify(creds),
  };
  return dispatch => fetch('/api/joinRoom', config)
    .then(response => response.json())
    .then((res) => {
      if (!res.success) {
        // ie we got a valid response, but the response says that this wasn't a successful login
        return Promise.reject(res.message);
      } else {
        // things are all good, we set a token locally
        localStorage.setItem('token', res.token);
        // tell our store that login has been done
        dispatch(receiveLogin(res.token));
      }
    })
    .catch(err => dispatch(loginError(err)));
}

