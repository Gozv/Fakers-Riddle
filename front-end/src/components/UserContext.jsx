// UserContext.js
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(null);

  const setUserEmail = (userEmail) => {
    setEmail(userEmail);
  };

  return (
    <UserContext.Provider value={{ email, setUserEmail }}>
      {children}
    </UserContext.Provider>
  );
};
