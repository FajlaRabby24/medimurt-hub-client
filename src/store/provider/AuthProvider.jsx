import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../contexts/AuthContext";
const googleProvider = new GoogleAuthProvider();

const AuthPrivider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // sign up user
  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //sign in user
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfile = (updatedInfo) => {
    return updateProfile(auth.currentUser, updatedInfo);
  };

  // sign out user
  const signOutUser = () => {
    return signOut(auth);
  };

  // google login
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log({ currentUser });
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authValue = {
    signUpUser,
    signInUser,
    loading,
    user,
    signOutUser,
    googleLogin,
    updateUserProfile,
  };
  return <AuthContext value={authValue}>{children}</AuthContext>;
};

export default AuthPrivider;
