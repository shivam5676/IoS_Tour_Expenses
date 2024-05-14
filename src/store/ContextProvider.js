import { useReducer } from "react";
// import Context from "./Context";
import { Action } from "@remix-run/router";
import SignUpModal from '../components/SignUpModal';
import Context from "./Context";
const initialState = { signUpModalOpen: false };
const reducerFn=(state,action)=>{
if(action.type==="signupModal"){
    return {...state,signUpModalOpen:!state.signUpModalOpen}
}
}

const ContextProvider = (props) => {
  const [currentState, dispatch] = useReducer(reducerFn, initialState);
  const signupModalOpenHandler = () => {
    dispatch({ type: "signupModal" });
  };
  const contextStore = {
    signUpModal: signupModalOpenHandler,
  };
  return (
    <Context.Provider value={contextStore}>{props.children}</Context.Provider>
  );
};
export default ContextProvider
