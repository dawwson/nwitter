import { ReactNode } from "react";
import * as S from "./style";

interface Props {
  type: "error" | "success";
  title: string;
  buttons: Array<{
    name: string;
    location: "left" | "right" | "center"; // center: 버튼이 하나일 경우
    onClick: () => void;
  }>;
  children: ReactNode;
}

const Modal = ({ type, title, children, buttons }: Props) => {
  return (
    <S.ModalOverlay>
      <S.ModalContainer>
        <S.Header>
          <S.Title type={type}>{title}</S.Title>
        </S.Header>
        <S.Content>{children}</S.Content>
        <S.Footer>
          {buttons.map((button, index) => (
            <S.Button
              key={index}
              type={type}
              $location={button.location}
              onClick={button.onClick}
            >
              {button.name}
            </S.Button>
          ))}
          {/* <S.Button type={type} location={} onClick={onClick}> */}
          {/* {buttonName} */}
          {/* </S.Button> */}
        </S.Footer>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default Modal;
