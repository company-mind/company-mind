import * as firebase from 'firebase';

export const READ = 'TopMenu/READ';
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
export function TopMenuRead() {
  return {
    type: READ,
  };
}

const initialState = {
  logOut: false,
  activeItem: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case READ:
      return {
        logOut: false,
        activeItem: '',
      };
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

export const dispatchTopMenuLogOut = (e, { name }) => async (dispatch) => {
  e.stopPropagation();
  await firebase.auth().signOut();
  dispatch(TopMenuLogOut(name));
};

export const dispatchTopMenu = ({ name }) => async (dispatch) => {
  dispatch(TopMenuSuccess(name));
};

export const dispatchTopMenuRead = () => async (dispatch) => {
  dispatch(TopMenuRead());
};
