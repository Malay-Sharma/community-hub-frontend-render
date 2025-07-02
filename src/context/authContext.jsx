import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  const isLoggedIn = !!user;

  // ✅ On initial load, check if the user is still logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/auth/me", {
          credentials: "include", // send cookies
        });
        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.log("Auth check failed:", err);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// context/authContext.js
// import { createContext, useContext, useEffect, useState } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Fetch user from localStorage or via API
//   useEffect(() => {
//     const fetchUser = async () => {
//       setLoading(true);
//       try {
//         // Option 1: If storing user in localStorage
//         const storedUser = localStorage.getItem("user");
//         if (storedUser) {
//           setUser(JSON.parse(storedUser));
//         } else {
//           // Option 2: Hit your backend to get current session
//           const res = await fetch("http://localhost:4000/api/auth/me", {
//             credentials: "include",
//           });
//           const data = await res.json();
//           if (data.success) {
//             setUser(data.user);
//           }
//         }
//       } catch (err) {
//         console.error("Failed to load user:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData)); // optional
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
