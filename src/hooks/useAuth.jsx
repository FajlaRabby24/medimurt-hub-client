import { use } from "react";
import { AuthContext } from "../store/contexts/contexts";

const useAuth = () => {
  const authValue = use(AuthContext);
  return authValue;
};

export default useAuth;
