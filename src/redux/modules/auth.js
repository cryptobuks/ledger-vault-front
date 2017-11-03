import axios from "axios";
import { push } from "react-router-redux";
import "u2f-api-polyfill";
import ledger from "ledgerco";

export const SET_TEAM_FIELD = "auth/SET_TEAM_FIELD";
export const LOGOUT = "auth/LOGOUT";
export const START_AUTHENTICATION = "auth/START_AUTHENTICATION";
export const CHECK_TEAM_SUCCESS = "auth/CHECK_TEAM_SUCCESS";
export const CHECK_TEAM_ERROR = "auth/CHECK_TEAM_ERROR";
export const REMOVE_TEAM_ERROR = "auth/REMOVE_TEAM_ERROR";
export const AUTHENTICATION_SUCCEED = "auth/AUTHENTICATION_SUCCEED";
export const AUTHENTICATION_FAILED = "auth/AUTHENTICATION_FAILED";
export const AUTHENTICATION_FAILED_API = "auth/AUTHENTICATION_FAILED_API";
export const AUTHENTICATION_FAILED_TIMEOUT =
  "auth/AUTHENTICATION_FAILED_TIMEOUT";
export const RESET_TEAM = "auth/RESET_TEAM";

export function setTeamField(val) {
  return {
    type: SET_TEAM_FIELD,
    value: val
  };
}

export function startAuthenticationFlag() {
  return {
    type: START_AUTHENTICATION
  };
}

export function checkTeamError(status) {
  return {
    type: CHECK_TEAM_ERROR,
    status
  };
}

export function resetTeam() {
  return {
    type: RESET_TEAM
  };
}

export function reinitTeamError() {
  return {
    type: REMOVE_TEAM_ERROR
  };
}

export function checkTeamSuccess() {
  return {
    type: CHECK_TEAM_SUCCESS
  };
}

export function authenticationSucceed() {
  return {
    type: AUTHENTICATION_SUCCEED
  };
}

export function authenticationFailed(e) {
  if (e === 5) {
    return {
      type: AUTHENTICATION_FAILED_TIMEOUT
    };
  } else if (e === "api") {
    return {
      type: AUTHENTICATION_FAILED_API
    };
  }

  return {
    type: AUTHENTICATION_FAILED
  };
}

export function setTokenToLocalStorage(token) {
  window.localStorage.setItem("token", token);
}

export function finishRegistration(data, email) {
  return () => {
    window.u2f.register(
      data.appId,
      data.registerRequests,
      data.registeredKeys,
      deviceResponse => {
        if (deviceResponse.errorCode) {
          // dispatch(authenticationFailed());
        } else {
          axios
            .post("finish_registration", { email, response: deviceResponse })
            .then(res => {
              console.log(res.data);
            });
        }
      }
    );
  };
}

export function registerDevice(email) {
  return dispatch => {
    axios.post("start_registration", { email }).then(res => {
      dispatch(finishRegistration(res.data, email));
    });
  };
}

export function finishAuthentication(data) {
  return (dispatch, getState) => {
    const { team } = getState().auth;

    window.u2f.sign(
      data.appId,
      data.challenge,
      data.registeredKeys,
      deviceResponse => {
        if (deviceResponse.errorCode) {
          dispatch(authenticationFailed(deviceResponse.errorCode));
        } else {
          axios
            .post("finish_authentication", {
              email: team,
              response: deviceResponse
            })
            .then(res => {
              setTokenToLocalStorage(res.data.token);
              setTimeout(() => {
                dispatch(authenticationSucceed());
              }, 500);
            })
            .catch(() => {
              dispatch(authenticationFailed("api"));
            });
        }
      }
    );
  };
}

export function startAuthentication() {
  return (dispatch, getState) => {
    dispatch(startAuthenticationFlag());
    const { team } = getState().auth;

    axios
      .post("start_authentication", { email: team })
      .then(res => {
        dispatch(checkTeamSuccess());
        dispatch(finishAuthentication(res.data));
      })
      .catch(e => {
        dispatch(checkTeamError(e.response.status));
      });
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

export function logoutAction() {
  return dispatch => {
    window.localStorage.removeItem("token");
    dispatch(logout());
  };
}

export const createInitialState = () => ({
  isAuthenticated: !!localStorage.getItem("token"),
  isCheckingTeam: false,
  teamValidated: false,
  teamError: false,
  team: ""
});

export default function reducer(state = createInitialState(), action) {
  switch (action.type) {
    case SET_TEAM_FIELD:
      return { ...state, team: action.value, teamError: false };
    case LOGOUT:
      return createInitialState();
    case "DATA_FETCHED_FAIL": {
      const shouldLogout =
        action.error.status &&
        action.error.status === action.spec.logoutUserIfStatusCode;
      if (shouldLogout) {
        window.localStorage.removeItem("token");
        return createInitialState();
      } else {
        return state;
      }
    }
    case CHECK_TEAM_ERROR:
      return { ...state, teamError: true, isCheckingTeam: false };
    case CHECK_TEAM_SUCCESS:
      return {
        ...state,
        teamError: false,
        isCheckingTeam: false,
        teamValidated: true
      };
    case REMOVE_TEAM_ERROR:
      return { ...state, teamError: false };
    case START_AUTHENTICATION:
      return { ...state, isCheckingTeam: true };
    case RESET_TEAM:
      return { ...state, teamValidated: false };
    case AUTHENTICATION_FAILED_API:
    case AUTHENTICATION_FAILED_TIMEOUT:
    case AUTHENTICATION_FAILED:
      return { ...state, teamValidated: false };
    default:
      return state;
  }
}
