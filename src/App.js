import React from 'react';
import LoginPage from './components/authentication/LoginPage';
import SignupPage from './components/authentication/SignupPage';
import AuthProvider from './contexts/AuthContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/main.css'
import Profile from './components/authentication/Profile';
import PrivateRoute from './components/PrivateRoute';
import ForgotPass from './components/authentication/ForgotPass';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<PrivateRoute />}>
            <Route path='/home' element={<Dashboard />} />
            <Route path='/user' element={<Profile />} />
          </Route>
          <Route element={<LoginPage />} path="/login" />
          <Route element={<SignupPage />} path="/signup" />
          <Route element={<ForgotPass />} path="/forgotpassword" />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
