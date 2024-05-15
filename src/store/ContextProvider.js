import { useReducer } from "react";
// import Context from "./Context";
import { Action } from "@remix-run/router";
import SignUpModal from "../components/SignUpModal";
import Context from "./Context";
const initialState = {
  signUpModalOpen: false,
  allUser: [],
  adminCurrentUserData: {},
  allVoucher: [],
};
const reducerFn = (state, action) => {
  if (action.type === "signupModal") {
    return { ...state, signUpModalOpen: !state.signUpModalOpen };
  }
  if (action.type === "addUser") {
    return { ...state, allUser: [...state.allUser, action.payload] };
  }
  if (action.type === "currentUserDetails") {
    return {
      ...state,
      adminCurrentUserData: {
        ...state.adminCurrentUserData,
        ...action.payload,
      },
    };
  }
  if (action.type === "allVoucher") {
    return {
      ...state,
      allVoucher: action.payload,
    };
  }
  return { ...state };
};

const ContextProvider = (props) => {
  const [currentState, dispatch] = useReducer(reducerFn, initialState);
  const signupModalOpenHandler = () => {
    dispatch({ type: "signupModal" });
  };
  const adduserDataHandler = (userData) => {
    dispatch({ type: "addUser", payload: userData });
  };
  const AdminCurrentUserHandler = (userData) => {
    dispatch({ type: "currentUserDetails", payload: userData });
  };
  const allVoucherHandler = (vouchers) => {
    dispatch({ type: "allVoucher", payload: vouchers });
  };
  const contextStore = {
    signUpModal: signupModalOpenHandler,
    addUserData: adduserDataHandler,
    allUser: currentState.allUser,
    AdminCurrentUser: AdminCurrentUserHandler,
    adminCurrentUserData: currentState.adminCurrentUserData,
    AllVoucher: allVoucherHandler,
    allVoucherData:currentState.allVoucher
  };
  return (
    <Context.Provider value={contextStore}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
