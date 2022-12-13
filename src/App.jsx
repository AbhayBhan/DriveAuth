import React from "react";
import AuthProvider from "./contexts/AuthContext";
import { Container } from "react-bootstrap";
import SignUp from "./components/SignUp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Dashboard from "./components/Dashboard";
import PrivateRoute from './PrivateRoute';
import ResetPass from './components/ResetPass';
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", marginTop: "-50px" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute />}>
                <Route exact path="/" element={<Dashboard />}></Route>
                <Route path="/updateprof" element={<UpdateProfile />}></Route>
              </Route>
              <Route path="/signup" element={<SignUp />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/resetpass" element={<ResetPass />}></Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Container>
  );
}

export default App;
