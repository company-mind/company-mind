import * as firebase from 'firebase';

export const SUCCESS = 'TopMenu/SUCCESS';

export function TopMenuSuccess() {
  return {
    type: SUCCESS,
  };
}

const initialState = {
  logOut: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        logOut: true,
      };
    default:
      return state;
  }
}

export const dispatchTopMenu = () => async (dispatch) => {
  firebase.auth().getRedirectResult();
  dispatch(TopMenuSuccess);
};
