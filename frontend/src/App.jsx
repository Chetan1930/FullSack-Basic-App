import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useContext } from "react";
import { useAuth } from "./context/UserContext";

const App = () => {
  const user = useAuth();

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to='/login' />}/>
        <Route path="/login" element={<Login/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
        {/* <Route path="/login" element={<Login/>} /> */}
      </Routes>
    </>
  );
};

export default App;
