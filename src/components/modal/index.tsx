import { ReactNode } from "react";
import * as S from "./style";

interface Props {
  type: "error" | "success";
  title: string;
  children: ReactNode;
  onClick: () => void;
}

const Modal = ({ type, title, children, onClick }: Props) => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.Header>
          <S.Title type={type}>{title}</S.Title>
        </S.Header>
        <S.Content>{children}</S.Content>
        <S.Footer>
          <S.Button type={type} onClick={onClick}>
            Close
          </S.Button>
        </S.Footer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
