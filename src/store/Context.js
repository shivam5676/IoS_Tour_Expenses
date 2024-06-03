import { createContext } from "react";

const Context = createContext({
  signUpModal: () => {},
  signUpModalOpen: "",

  addUserData: () => {},
  allUser: [],
  AdminCurrentUser: () => {},
  adminCurrentUserData: {},
  AllVoucher: () => {},
  allVoucherData: [],
  userExpenses: () => {},
  userExpensesData: [],
  onGoingTour: () => {},
  onGoingData: [],
  userCurrentTourExpenses: () => {},
  userCurrentTourExpenseData: [],
  deleteUserCurrentTourExpenseHandler:()=>{},
  currentTourId: () => {},
  currentTourIdData: "",
  removeOnGoingTour: () => {},
  loginDataHandler: () => {},
  loginData: "",
  logOutHandler:()=>{}

});
export default Context;
