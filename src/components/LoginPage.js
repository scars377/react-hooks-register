import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { registeredContext } from "../contexts/registeredContext";
import { useRegister } from "../hooks/useRegister";

const Field = styled.div`
  margin: 1.5em 0;
  & > label {
    display: block;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.7em;
  margin: 0 1em;
`;

const Submit = styled.button.attrs({ type: "submit" })`
  width: 10em;
  height: 2em;
`;

export default function LoginPage() {
  const { register, loading, error, resetError } = useRegister();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);

  const { setRegistered } = useContext(registeredContext);

  useEffect(() => {
    resetError();
  }, [username, password, email, terms]);

  const submit = async (e) => {
    e.preventDefault();

    const success = await register(username, password, email, terms);
    setRegistered(success);
  };

  return (
    <form onSubmit={submit}>
      <Field>
        <label>NAME</label>
        <input
          type="text"
          placeholder="輸入使用者名稱"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {error?.username && <ErrorMessage>{error.username}</ErrorMessage>}
      </Field>

      <Field>
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="輸入密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error?.password && <ErrorMessage>{error.password}</ErrorMessage>}
      </Field>

      <Field>
        <label>E-MAIL</label>
        <input
          type="text"
          placeholder="輸入email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error?.email && <ErrorMessage>{error.email}</ErrorMessage>}
      </Field>

      <Field>
        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
          />
          <span>我已閱讀使用者條款</span>
        </label>
      </Field>

      <Submit disabled={loading}>{loading ? "Loading..." : "送出"}</Submit>
    </form>
  );
}
