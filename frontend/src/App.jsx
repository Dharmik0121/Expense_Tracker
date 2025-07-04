import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import AnimateCursor from './animations/Animatedcursor';
import UserProvider from './context/UserContext';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <UserProvider>
      <div>
        <AnimateCursor />
        <Router>
          <Routes>
            <Route path="/" element={<Root />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/signup" exact element={<SignUp />} />
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  )
}

export default App


const Root = () => {
  //check if token exists in localstorage
  const isAuthenticated = !!localStorage.getItem("token");

  //redirect to dashboard if auunthenticated, otherwise to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
}