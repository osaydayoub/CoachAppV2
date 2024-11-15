import { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Translation state
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState(i18n.language);
  
    const changeLanguage = (lang) => {
      i18n.changeLanguage(lang);
      setLanguage(lang);
    };
  
    useEffect(() => {
      setLanguage(i18n.language);
    }, [i18n.language]);

  const value = {
    currentUser,
    setCurrentUser,
    isLoggedIn,
    setIsLoggedIn,
    t,
    language,
    changeLanguage,
  };
  return (
    //add loading spinner
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}


