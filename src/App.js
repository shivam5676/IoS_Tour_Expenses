import { Route, Routes } from "react-router-dom";
import AdminPanel from "./components/AdminPanel";
import Login from "./components/login";
import AdminUserPanel from "./components/AdminUserPanel";


function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={ <Login></Login>}></Route>
        <Route path="/adminUser" element={   <AdminUserPanel></AdminUserPanel>}></Route>
       <Route path="*" element={   <AdminPanel></AdminPanel>}></Route>
      
      </Routes>
    </>
  );
}

export default App;
