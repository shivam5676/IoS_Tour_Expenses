import { useReducer } from "react";
// import Context from "./Context";
import { Action } from "@remix-run/router";
import SignUpModal from "../components/SignUpModal";
import Context from "./Context";
const initialState = {
  signUpModalOpen: false,
  allUser: [],
  adminCurrentUserData: {},
  allVoucherData: [],
  userExpenseData: [],
  onGoingData: [],
  userCurrentTourExpensesData: [],
  currentTourIdData: null,
  loginData: null,
  token: null,
};
const reducerFn = (state, action) => {
  if (action.type === "signupModal") {
    return { ...state, signUpModalOpen: !state.signUpModalOpen };
  }
  if (action.type === "addUser") {
    return { ...state, allUser: [...state.allUser, action.payload] };
  }
  if (action.type === "currentUserDetails") {
    console.log(action.payload);

    return {
      ...state,
      adminCurrentUserData: {
        ...state.adminCurrentUserData,
        ...action.payload,
      },
    };
  }
  if (action.type === "allVoucher") {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    return {
      ...state,
      allVoucherData: [...action.payload],
    };
  }
  if (action.type == "addUserExpense") {
    return {
      ...state,
      userExpenseData: [...state.userExpenseData, action.payload],
    };
  }
  if (action.type == "addOnGoing") {
    return {
      ...state,
      onGoingData: [...state.onGoingData, action.payload],
    };
  }
  if (action.type == "addCurrentTourExpense") {
    return {
      ...state,
      userCurrentTourExpensesData: [
        ...state.userCurrentTourExpensesData,
        action.payload,
      ],
    };
  }
  if (action.type == "addCurrentTourId") {
    return {
      ...state,
      currentTourIdData: action.payload,
    };
  }
  if (action.type == "resetCurrentUserData") {
    return {
      ...state,
      userCurrentTourExpensesData: [],
    };
  }
  if (action.type == "removeOnGoingTour") {
    console.log(action.payload);
    const arrayAfterRemove = state.onGoingData.filter((current) => {
      return current.id != action.payload;
    });
    console.log("=>>>>", arrayAfterRemove);
    return {
      ...state,
      onGoingData: arrayAfterRemove,
    };
  }
  if (action.type == "saveLoginDetails") {
    return {
      ...state,
      loginData: action.payload.data,
      token: action.payload.token,
    };
  }
  if (action.type == "logOut") {
    localStorage.removeItem("token");
    return {
      signUpModalOpen: false,
      allUser: [],
      adminCurrentUserData: {},
      allVoucherData: [],
      userExpenseData: [],
      onGoingData: [],
      userCurrentTourExpensesData: [],
      currentTourIdData: null,
      loginData: null,
      token: null,
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
    console.log(userData);
    dispatch({ type: "addUser", payload: userData });
  };
  const AdminCurrentUserHandler = (userData) => {
    console.log(userData);
    dispatch({ type: "currentUserDetails", payload: userData });
  };
  const allVoucherHandler = (vouchers) => {
    dispatch({ type: "allVoucher", payload: vouchers });
  };
  const addUserExpenseHandler = (expenseData) => {
    dispatch({ type: "addUserExpense", payload: expenseData });
  };
  const onGoingTourHandler = (voucherData) => {
    dispatch({ type: "addOnGoing", payload: voucherData });
  };
  const userCurrentTourExpenseHandler = (tourData) => {
    dispatch({ type: "addCurrentTourExpense", payload: tourData });
  };
  const currentTourIdHandler = (tourId) => {
    dispatch({ type: "addCurrentTourId", payload: tourId });
    dispatch({ type: "resetCurrentUserData" });
  };
  const removeOnGoingTourHandler = (tourId) => {
    dispatch({ type: "removeOnGoingTour", payload: tourId });
  };
  const loginDataHandler = (userData) => {
    dispatch({ type: "saveLoginDetails", payload: userData });
  };
  const logOutHandler = () => {
    dispatch({ type: "logOut" });
  };

  const contextStore = {
    signUpModal: signupModalOpenHandler,
    signUpModalOpen: currentState.signUpModalOpen,
    addUserData: adduserDataHandler,
    allUser: currentState.allUser,
    AdminCurrentUser: AdminCurrentUserHandler,
    adminCurrentUserData: currentState.adminCurrentUserData,
    AllVoucher: allVoucherHandler,
    allVoucherData: currentState.allVoucherData,
    userExpensesData: currentState.userExpenseData,
    userExpenses: addUserExpenseHandler,
    onGoingTour: onGoingTourHandler,
    onGoingData: currentState.onGoingData,
    userCurrentTourExpenses: userCurrentTourExpenseHandler,
    userCurrentTourExpenseData: currentState.userCurrentTourExpensesData,
    currentTourId: currentTourIdHandler,
    currentTourIdData: currentState.currentTourIdData,
    removeOnGoingTour: removeOnGoingTourHandler,
    loginDataHandler: loginDataHandler,
    loginData: currentState.loginData,
    logOutHandler: logOutHandler,
  };
  return (
    <Context.Provider value={contextStore}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
