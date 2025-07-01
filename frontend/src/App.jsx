import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useAuth } from "./context/UserContext";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";

const App = () => {
  const {isAuthenticated} = useAuth();

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/login" element={<Login/>} /> */}
      </Routes>
    </>
  );
};

export default App;
