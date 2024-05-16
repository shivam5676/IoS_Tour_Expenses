import { createContext } from "react";

const Context = createContext({
  signUpModal: () => {},
  addUserData: () => {},
  allUser: [],
  AdminCurrentUser: () => {},
  adminCurrentUserData: {},
  AllVoucher: () => {},
  allVoucherData: [],
  userExpenses: () => {},
  userExpensesData: [],
});
export default Context;
