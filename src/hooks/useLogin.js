// // src/hooks/useLogin.js
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export function useLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError(null);

//     // Dummy validation logic
//     if (!email || !password) {
//       setError("Please enter both email and password.");
//       return;
//     }

//     // You can replace this with real API call logic
//     console.log("Login successful, redirecting to /dashboard");
//     navigate("/dashboard");
//   };

//   return {
//     email,
//     setEmail,
//     password,
//     setPassword,
//     handleSubmit,
//     error,
//   };
// }
