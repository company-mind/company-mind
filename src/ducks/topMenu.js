import * as firebase from 'firebase';

export const SUCCESS = 'TopMenu/SUCCESS';
export const LOGOUT = 'TopMenu/LOGOUT';

export function TopMenuSuccess(name) {
  return {
    type: SUCCESS,
    activeItem: name,
  };
}
export function TopMenuLogOut(name) {
  return {
    type: LOGOUT,
    activeItem: name,
  };
}

const initialState = {
  logOut: false,
  activeItem: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        activeItem: action.activeItem,
      };
    case LOGOUT:
      return {
        logOut: true,
        activeItem: action.activeItem,
      };
    default:
      return state;
  }
}

export const dispatchTopMenuLogOut = ({ name }) => async (dispatch) => {
  await firebase.auth().signOut();
  dispatch(TopMenuLogOut(name));
};

export const dispatchTopMenu = ({ name }) => async (dispatch) => {
  dispatch(TopMenuSuccess(name));
};
