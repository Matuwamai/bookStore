import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // Make sure it's a named export

export const useAuth = () => useContext(AuthContext);
