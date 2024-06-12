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
  userCurrentTourExpenses: () => {},
  userCurrentTourExpenseData: [],
  deleteUserCurrentTourExpenseHandler: () => {},
  removeVoucherfromAllVoucher: () => {},
  currentTourId: () => {},
  currentTourIdData: "",
  removeOnGoingTour: () => {},
  loginDataHandler: () => {},
  loginData: "",
  logOutHandler: () => {},
  addTourInOngoing: ()=>{},
  updateCurrentTourExpenses:()=>{}
});
export default Context;
