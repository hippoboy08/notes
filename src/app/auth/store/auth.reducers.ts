import * as AuthActions from "./auth.actions";
import { User } from '../user.model';
import { StitchUser } from 'mongodb-stitch-browser-sdk';


export interface State {
  // token: string;
  authenticated: boolean;
  user: StitchUser;
  errorMessage: string;
  successMessage: string;
  isLoading: boolean;
}

const initialState: State = {
  // token: null,
  authenticated: false,
  errorMessage: null,
  successMessage: null,
  isLoading: false,
  user: null
};

export function reducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGN_UP_START:
    case AuthActions.SIGN_IN_START:
      return {
        ...state,
        isLoading: true,
        errorMessage: null
      }
    case AuthActions.AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.message,
        user: null
      }
    case AuthActions.AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        successMessage: action.message,
        user: null
      }
    case AuthActions.SIGNED_IN:
      return {
        ...state,
        isLoading: false,
        authenticated: true,
        errorMessage: null,
        // user: action.user
      }
    case AuthActions.LOG_OUT:
      return {
        ...state,
        user: null,
        authenticated: false
      }
    default:
      return state;
  }
}