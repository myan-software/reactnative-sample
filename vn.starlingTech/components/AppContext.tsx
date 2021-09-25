import React from 'react';

export type UserProfileType = {
  id: number;
  username?: string;
  name: string;
  phone?: string;
  email: string;
  address?: string;
  birthday?: string;
  gender?: number;
  avatar?: string;
  subscription: boolean;

  token: string;
};

export type ContextType = {
  user: UserProfileType | null;
  notification: number;
  // subscription: boolean;
  signIn: (_user: UserProfileType) => void;
  signOut: () => void;
  setSubscription: (_subscription: boolean) => void;
};

const initialContext: ContextType = {
  user: null,
  notification: 0,
  // subscription: false,
  signIn: () => {},
  signOut: () => {},
  setSubscription: () => {},
};

export const AppContext = React.createContext<ContextType>(initialContext);
