import {
  useState,
  useEffect,
  createContext,
  useContext,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type User = {
  id: string;
  email: string;
  username: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};
const API_URL = "http://10.51.13.245:3000/api";
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkIsUserLoggedIn();
  }, []);

  const checkIsUserLoggedIn = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        router.replace("/");
        return;
      } else {
        validateToken(token);
        // setUser({ id: "1", email: "gg@gmail.com", username: "gg" });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const validateToken = async (token: string) => {
    //Validate the token by sending it in the Headers
    //If the token is valid, return the user data
    //If the token is invalid, redirect the user to the login page
    try {
      const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        router.replace("/login");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Token Recieved", data.token); // This will log the token in the console
        try {
          await AsyncStorage.setItem("userToken", data.token);
          console.log("Token Stored in AsyncStorage");
        } catch (e) {
          console.log("Error in storing token in AsyncStorage", e);
        }
        setUser(data.user);
        // console.log("Inshallah");
        // setUser({ id: "1", email: "gg@gmail.com", username: "gg" });
        router.replace("/(app)/home");
      } else {
        alert(data.error);
      }
    } catch (e) {
      console.log(e);
      alert("Catch: Login Failed, Please try again after some time");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token);
        setUser(data.user);
        // setUser({ id: "1", email: "gg@gmail.com", username: "gg" });
        router.replace("/(app)/home");
      } else {
        alert(
          data.message ||
            "Registration Failed, Please try again after some time"
        );
      }
    } catch (e) {
      console.log(e);
      alert("Registration Failed, Please try again after some time");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userToken");
      setUser(null);
      router.replace("/login");
    } catch (e) {
      console.log(e);
      alert("Logout Failed, Please try again after some time");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
