import { createContext, useContext, useState, useEffect } from "react";

const API = "https://fsa-jwt-practice.herokuapp.com";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState();
  const [location, setLocation] = useState("GATE");
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setLocation("TABLET");
    }
  }, []);

  async function signup(formData) {
    setError(null);

    const username = formData.get("username");

    try {
      const response = await fetch(`${API}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        throw new Error("Signup failed — check your name and try again.");
      }

      const data = await response.json();
      setToken(data.token);
      sessionStorage.setItem("token", data.token); // persist token
      setLocation("TABLET");
    } catch (err) {
      setError(err.message);
    }
  }

  async function authenticate() {
    setError(null);

    if (!token) {
      setError("No token found — please sign in again.");
      return;
    }

    try {
      const response = await fetch(`${API}/authenticate`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Authentication failed — your token may be invalid.");
      }

      setLocation("TUNNEL");
    } catch (err) {
      setError(err.message);
    }
  }

  const value = {
    token,
    location,
    error,
    signup,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used within an AuthProvider");
  return context;
}
