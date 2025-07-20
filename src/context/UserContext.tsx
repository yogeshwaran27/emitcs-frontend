// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface User {
  mail: string | null;
  name: string | null;
  company: string | null;
  companyURL: string | null;
}

interface UserContextType extends User {
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType>({
  mail: null,
  name: null,
  company: null,
  companyURL:null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ mail: null, name: null ,company:null,companyURL:null});

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
