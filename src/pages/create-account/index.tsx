import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import * as S from "./style";
import Modal from "../../components/modal";
import { auth } from "../../configs/firebase";
import { firebaseError } from "../../configs/error-code";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading || name === "" || email === "" || password === "") {
      return;
    }

    try {
      setIsLoading(true);
      // 1. 계정 생성
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // 2. user name 설정
      await updateProfile(credentials.user, { displayName: name });

      // 3. home으로 리다이렉트
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
      <S.Title>Join 𝕏</S.Title>
      <S.Form onSubmit={handleOnSubmit}>
        <S.Input
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          onChange={handleOnChange}
          required
        />
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
        <S.Input type="submit" value="Create Account" />
      </S.Form>
      {isOpen && (
        <Modal type="error" title="Error" onClick={() => setIsOpen(false)}>
          <p>{error}</p>
        </Modal>
      )}
    </S.Wrapper>
  );
}
