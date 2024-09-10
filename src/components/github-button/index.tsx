import { useNavigate } from "react-router-dom";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import * as S from "./style";
import { auth } from "../../configs/firebase";

const GithubButton = () => {
  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const provider = new GithubAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <S.Button onClick={handleOnClick}>
      <S.Logo src="/github-logo.svg" />
      Continue with GitHub
    </S.Button>
  );
};

export default GithubButton;
