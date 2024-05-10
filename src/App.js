import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/login";
import AdminUserManageMent from "./components/AdminUserManageMent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={ <Login></Login>}></Route>
        <Route path="/adminUser" element={   <AdminUserManageMent></AdminUserManageMent>}></Route>
       <Route path="*" element={   <AdminPanel></AdminPanel>}></Route>
      
      </Routes>
    </>
  );
}

export default App;
