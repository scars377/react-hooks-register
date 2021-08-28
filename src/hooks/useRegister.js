import axios from "axios";
import { useState } from "react";

const REGISTER_URL = "https://vue-lessons-api.herokuapp.com/auth/registered";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const resetError = () => setError(null);

  const register = async (
    username = "",
    password = "",
    email = "",
    terms = false
  ) => {
    if (loading) return;
    setLoading(true);

    const data = { username, password, email, terms };
    try {
      await axios.post(REGISTER_URL, data); // either 200 or 403
      return true;
    } catch (error) {
      setError(error.response.data.error_message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, register, resetError };
}
