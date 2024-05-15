import { createContext } from "react";

const Context = createContext({
  signUpModal: () => {},
  addUserData: () => {},
  allUser: [],
  AdminCurrentUser: () => {},
  adminCurrentUserData: {},
  AllVoucher: ()=>{},
  allVoucherData:[]
});
export default Context;
