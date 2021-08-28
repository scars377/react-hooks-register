import { createContext, useState } from "react";

export const registeredContext = createContext();

const { Provider } = registeredContext;

export const RegisteredContextProvider = ({ children }) => {
  const [registered, setRegistered] = useState(false);

  return <Provider value={{ registered, setRegistered }}>{children}</Provider>;
};
