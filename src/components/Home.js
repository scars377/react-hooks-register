import { useContext } from "react";
import { registeredContext } from "../contexts/registeredContext";
import { LoginPage } from "./LoginPage";

export const Home = () => {
  const { registered } = useContext(registeredContext);

  return <div>{registered ? <div>Registered</div> : <LoginPage />}</div>;
};
