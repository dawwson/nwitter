import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";

import * as S from "./style";
import Modal from "../../components/modal";
import { auth } from "../../configs/firebase";
import { firebaseError } from "../../configs/error-code";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || email === "" || password === "") {
      return;
    }

    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setIsOpen(true);
        setError(firebaseError[e.code] ?? e.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Wrapper>
      <S.Title>Sign into 𝕏</S.Title>
      <S.Form onSubmit={handleOnSubmit}>
        <S.Input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          onChange={handleOnChange}
          required
        />
        <S.Input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={handleOnChange}
          required
        />
        <S.Input type="submit" value={isLoading ? "Loading..." : "Sign in"} />
      </S.Form>
      <S.Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">Create one &rarr;</Link>
      </S.Switcher>
      {isOpen && (
        <Modal type="error" title="Error" onClick={() => setIsOpen(false)}>
          <p>{error}</p>
        </Modal>
      )}
    </S.Wrapper>
  );
};

export default Login;
