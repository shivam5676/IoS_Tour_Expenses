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

  onGoingTour: () => {},
  onGoingData: [],
  removeOnGoingTour: () => {},
  userCurrentTourExpenses: () => {},
  userCurrentTourExpenseData: [],
  deleteUserCurrentTourExpenseHandler: () => {},
  removeVoucherfromAllVoucher: () => {},
  currentTourId: () => {},
  currentTourIdData: "",
  currentTourDetailsHandler: ()=>{},
  currentTourDetailsData:{},
  loginDataHandler: () => {},
  loginData: "",
  logOutHandler: () => {},
  addTourInOngoing: () => {},
  updateCurrentTourExpenses: () => {},
});
export default Context;
