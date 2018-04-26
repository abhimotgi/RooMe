import authenticatedRequest from '../utils/authenticatedRequest';

export const REMOVEDITEM_FUL = 'REMOVEDITEM_FUL';
export const REMOVEDITEM_REJ = 'REMOVEDITEM_REJ';

export const TOGGLEDITEM_FUL = 'TOGGLEDITEM_FUL';
export const TOGGLEDITEM_REJ = 'TOGGLEDITEM_REJ';

export const GETITEMS_FUL = 'GETITEMS_FUL';
export const GETITEMS_REJ = 'GETITEMS_REJ';

export const ADDEDITEM_FUL = 'ADDEDITEM_FUL';
export const ADDEDITEM_REJ = 'ADDEDITEM_REJ';

export function removeItem(itemId) {
  return (dispatch) => {
    authenticatedRequest('POST', '/api/removeItem/' + itemId, {})
      .then(res => res.json())
      .then((resp) => {
        dispatch({
          type: REMOVEDITEM_FUL,
          data: resp.data
        });
      })
      .catch((err) => {
        dispatch({
          type: REMOVEDITEM_REJ,
          error: err
        });
      })
  };
}

export function toggleItem(itemId) {
  return (dispatch) => {
    authenticatedRequest('POST', '/api/toggleItem/' + itemId, {})
      .then(res => res.json())
      .then((resp) => {
        dispatch({
          type: TOGGLEDITEM_FUL,
          data: resp.data
        });
      })
      .catch((err) => {
        dispatch({
          type: TOGGLEDITEM_REJ,
          error: err
        });
      })
  };
}


export function getItems() {
  return (dispatch) => {
    authenticatedRequest('GET', '/api/getAllItems')
      .then(res => {
        // console.log('itemActions line 58', res.json());
        return res.json();
      }) 
      .then((resp) => {
        // console.log('itemActions line 62', resp[2]);
        dispatch({
          type: GETITEMS_FUL,
          data: resp
        });
      })
      .catch((err) => {
        dispatch({
          type: GETITEMS_REJ,
          error: err
        });
      });
  };
}




export function addItem(itemContent) {
  return (dispatch) => {
    authenticatedRequest('POST', '/api/addItem', {content: itemContent})
      .then(res => res.json())
      .then((resp) => {
        dispatch({
          type: ADDEDITEM_FUL,
          data: resp.data
        });
      })
      .catch((err) => {
        dispatch({
          type: ADDEDITEM_REJ,
          error: err
        });
      });
  };
}

