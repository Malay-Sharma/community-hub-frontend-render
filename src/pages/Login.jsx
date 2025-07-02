import { LoginForm } from "@/components/login-form";
import React from 'react';
import { useNavigate } from "react-router-dom";

// const Login = () => {
const Login = ({ setIsLoggedIn }) => {

  // const navigate = useNavigate();

  // const handleLogin = () => {
  //   setIsLoggedIn(true);
  //   navigate('/dashboard');  
  // };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-8">
            <LoginForm />
    </section>
  );
};

export default Login;
