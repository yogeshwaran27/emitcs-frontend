// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface User {
  mail: string | null;
  name: string | null;
}

interface UserContextType extends User {
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType>({
  mail: null,
  name: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>({ mail: null, name: null });

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
