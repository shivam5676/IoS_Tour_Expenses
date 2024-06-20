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
    return { ...state, allUser: [...action.payload] };
  }
  if (action.type === "currentUserDetails") {
    console.log("current user", action.payload);

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

  if (action.type == "addOnGoing") {
    return {
      ...state,
      onGoingData: [...action.payload],
    };
  }
  if (action.type == "addTourInOngoing") {
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
  if (action.type === "addCurrentTourId") {
    return {
      ...state,
      currentTourIdData: action.payload,
    };
  }
  if (action.type === "resetCurrentUserData") {
    return {
      ...state,
      userCurrentTourExpensesData: [],
    };
  }
  if (action.type === "removeOnGoingTour") {
    console.log(action.payload);
    const arrayAfterRemove = state.onGoingData.filter((current) => {
      return current.id != action.payload;
    });
    console.log("=>>>>", arrayAfterRemove);
    return {
      ...state,
      onGoingData: arrayAfterRemove,
      currentTourIdData:null
    };
  }
  if (action.type === "saveLoginDetails") {
    console.log("inside payload", action.payload);
    return {
      ...state,
      loginData: action.payload,
      // token: action.payload.token,
    };
  }
  if (action.type === "deleteExpense") {
    const currentUSerExpenses = [...state.userCurrentTourExpensesData];
    const expensesAfterDeletion = currentUSerExpenses.filter(
      (current) => current.id != action.payload
    );
    return {
      ...state,
      userCurrentTourExpensesData: expensesAfterDeletion,
    };
  }
  if (action.type === "changeStateFromAllVoucher") {
    const allVoucherDataCopy = [...state.allVoucherData];
    console.log(allVoucherDataCopy);
    const findVoucherId = allVoucherDataCopy.findIndex(
      (current) => current.Voucher.id == action.payload.id
    );
    console.log(findVoucherId,action.payload);
    console.log(allVoucherDataCopy[findVoucherId]);
    allVoucherDataCopy[findVoucherId].Voucher.statusType =
      action.payload.status;
    allVoucherDataCopy[findVoucherId].status = action.payload.status;

    console.log(allVoucherDataCopy[findVoucherId]);

    // allVoucherDataCopy[findVoucherId];
    // return;
    return {
      ...state,
      allVoucherData: allVoucherDataCopy,
    };
  }
  if (action.type == "updateCurrentTourExpenses") {
    console.log(action.payload);
    const ExpenseList = [...state.userCurrentTourExpensesData];
    const expenseIndex = ExpenseList.findIndex(
      (current) => current.id == action.payload.id
    );
    if (expenseIndex != -1) {
      ExpenseList[expenseIndex] = action.payload;
      return {
        ...state,
        userCurrentTourExpensesData: ExpenseList,
      };
    }
    return state;
  }
  if (action.type === "logOut") {
    localStorage.removeItem("token");
    return {
      signUpModalOpen: false,
      allUser: [],
      adminCurrentUserData: {},
      allVoucherData: [],
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
  const deleteUserCurrentTourExpenseHandler = (id) => {
    dispatch({ type: "deleteExpense", payload: id });
  };
  const removeVoucherfromAllVoucher = (id) => {
    console.log(id);
    dispatch({ type: "changeStateFromAllVoucher", payload: id });
  };
  const addTourInOngoingHandler = (tour) => {
    dispatch({ type: "addTourInOngoing", payload: tour });
  };
  const updateCurrentTourExpensesHandler = (updatedTour) => {
    dispatch({ type: "updateCurrentTourExpenses", payload: updatedTour });
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

    onGoingTour: onGoingTourHandler,
    onGoingData: currentState.onGoingData,
    userCurrentTourExpenses: userCurrentTourExpenseHandler,
    userCurrentTourExpenseData: currentState.userCurrentTourExpensesData,
    deleteUserCurrentTourExpenseHandler: deleteUserCurrentTourExpenseHandler,
    currentTourId: currentTourIdHandler,
    currentTourIdData: currentState.currentTourIdData,
    removeOnGoingTour: removeOnGoingTourHandler,
    loginDataHandler: loginDataHandler,
    loginData: currentState.loginData,
    logOutHandler: logOutHandler,
    removeVoucherfromAllVoucher: removeVoucherfromAllVoucher,
    addTourInOngoing: addTourInOngoingHandler,
    updateCurrentTourExpenses: updateCurrentTourExpensesHandler,
  };
  return (
    <Context.Provider value={contextStore}>{props.children}</Context.Provider>
  );
};
export default ContextProvider;
