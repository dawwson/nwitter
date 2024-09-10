import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";

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
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={handleOnSubmit}>
        <Input
          name="name"
          value={name}
          placeholder="Name"
          type="text"
          onChange={handleOnChange}
          required
        />
        <Input
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          onChange={handleOnChange}
          required
        />
        <Input
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          onChange={handleOnChange}
          required
        />
        <Input type="submit" value="Create Account" />
      </Form>
      {isOpen && (
        <Modal type="error" title="Error" onClick={() => setIsOpen(false)}>
          <p>{error}</p>
        </Modal>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 420px;
  padding: 50px 0px;
`;

const Title = styled.h1`
  font-size: 42px;
`;

const Form = styled.form`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const Input = styled.input`
  padding: 10px 20px;
  border-radius: 50px;
  border: none;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;
