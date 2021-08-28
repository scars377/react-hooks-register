import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { registeredContext } from "../contexts/registeredContext";
import { useRegister } from "../hooks/useRegister";

const Field = styled.div`
  margin: 1.5em 0;
  & > label {
    display: block;
    user-select: none;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 0.7em;
  margin: 0 1em;
  &:empty {
    display: none;
  }
`;

const Submit = styled.button.attrs({ type: "submit" })`
  width: 10em;
  height: 2em;
`;

export const LoginPage = () => {
  const { setRegistered } = useContext(registeredContext);

  const { register, loading, error, resetError } = useRegister();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    resetError();
  }, [username, password, email, terms]);

  const submit = async (e) => {
    e.preventDefault();
    resetError();

    const success = await register(username, password, email, terms);
    setRegistered(success);
  };

  const canSubmit =
    !loading && username !== "" && password !== "" && email !== "" && terms;

  return (
    <form onSubmit={submit}>
      <Field>
        <label>NAME</label>
        <input
          type="text"
          placeholder="輸入使用者名稱"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <ErrorMessage>{error?.username}</ErrorMessage>
      </Field>

      <Field>
        <label>PASSWORD</label>
        <input
          type="password"
          placeholder="輸入密碼"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <ErrorMessage>{error?.password}</ErrorMessage>
      </Field>

      <Field>
        <label>E-MAIL</label>
        <input
          type="text"
          placeholder="輸入email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <ErrorMessage>{error?.email}</ErrorMessage>
      </Field>

      <Field>
        <label>
          <input
            type="checkbox"
            checked={terms}
            onChange={(e) => setTerms(e.target.checked)}
            disabled={loading}
          />
          <span>我已閱讀使用者條款</span>
        </label>
      </Field>

      <Submit disabled={!canSubmit}>{loading ? "Loading..." : "送出"}</Submit>
    </form>
  );
};
