import { RegisteredContextProvider } from "../contexts/registeredContext";
import { Home } from "./Home";

export const App = () => (
  <RegisteredContextProvider>
    <Home />
  </RegisteredContextProvider>
);
