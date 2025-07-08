import { use } from "react";
import { AuthContext } from "../store/contexts/AuthContext";

const useAuth = () => {
  const authValue = use(AuthContext);
  return authValue;
};

export default useAuth;
