import { RegisteredContextProvider } from "../contexts/registeredContext";
import Home from "./Home";

export default function App() {
  return (
    <RegisteredContextProvider>
      <Home />
    </RegisteredContextProvider>
  );
}
