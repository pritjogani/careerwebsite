import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { API_BASE_URL } from "../config/api";

// Context
export const AuthContext = createContext();

// Provider function
export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState("");
    const [hr, sethr] = useState(false);
    const [isloading, setIsloading] = useState(true);
    const [jobs, setjobs] = useState([]);
    const authorizationtoken = token ? `Bearer ${token}` : "";

    // Helper for HR detection
    const isHR = Boolean(
        hr || (user && (user.ishr === true || user.role === "hr" || user.role === "HR"))
    );

    const Logoutuser = () => {
        setToken("");
        setUser("");
        sethr(false);
        localStorage.removeItem("token");
    };

    const isLoggedIn = !!token;

    // Add job opening in home portal
    const getjobs = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/hr/alljobtitle`, {
                method: "GET",
            });
            if (response.ok) {
                const data = await response.json();
                setjobs(data);
            }
        } catch (error) {
            console.log(`jobs frontend error: ${error}`);
        }
    };

    // JWT authentication to get the current user data
    const userAuthentication = useCallback(async (currentToken) => {
        const activeToken = currentToken || token;
        if (!activeToken) {
            setUser("");
            sethr(false);
            setIsloading(false);
            return;
        }

        try {
            setIsloading(true);
            const response = await fetch(`${API_BASE_URL}/api/auth/user`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${activeToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                const userData = data.userData;
                setUser(userData);
                if (userData && (userData.ishr === true || userData.role === "hr" || userData.role === "HR")) {
                    sethr(true);
                } else {
                    sethr(false);
                }
                setIsloading(false);
            } else {
                console.log("Error fetching user data: unauthorized or invalid token");
                setUser("");
                sethr(false);
                setIsloading(false);
            }
        } catch (error) {
            console.log("Error fetching user data:", error);
            setUser("");
            sethr(false);
            setIsloading(false);
        }
    }, [token]);

    // Store token in localStorage and immediately authenticate
    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
        userAuthentication(serverToken);
    };

    useEffect(() => {
        getjobs();
        if (token) {
            userAuthentication(token);
        } else {
            setIsloading(false);
        }
    }, [token, userAuthentication]);

    return (
        <AuthContext.Provider
            value={{
                hr,
                isHR,
                user,
                storeTokenInLs,
                Logoutuser,
                isLoggedIn,
                isloading,
                userAuthentication,
                jobs,
                authorizationtoken,
                getjobs,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

// Consumer delivery function
export const useAuth = () => {
    const AuthContextValue = useContext(AuthContext);
    if (!AuthContextValue) {
        throw new Error("useAuth used outside of the provider");
    }
    return AuthContextValue;
};