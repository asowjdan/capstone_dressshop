import React, { createContext, useState, ReactNode } from 'react';
import { User } from './types';

export type UserContextType = {
  user: User | null;
  login: (id: string, password: string) => void;
  logout: () => void;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const username = sessionStorage.getItem('username');

  const handleLogin = (id: string, password: string) => {
    // 로그인 처리 로직
    if (id === '1111' && password === '1234') {
      const newUser: User = {
        id: 1111,
        nickname: '체리붓세',
        username: '이정무'
      };
      setUser(newUser);
      sessionStorage.setItem('username', newUser.username);
    }
  };

  const handleLogout = () => {
    // 로그아웃 처리 로직
    setUser(null);
    sessionStorage.removeItem('username');
  };

  const contextValue: UserContextType = {
    user: user || (username ? { id: 1111, nickname: '체리붓세', username: username } : null),
    login: handleLogin,
    logout: handleLogout,
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

