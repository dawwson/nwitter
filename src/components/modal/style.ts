import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px); /* 모달이 위에서 내려오는 효과 */
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  opacity: 0; /* 초기값 */
  animation: ${fadeIn} 0.3s ease forwards; /* 서서히 나타나는 애니메이션 */
`;

export const ModalContainer = styled.div`
  background-color: white;
  width: 350px;
  max-width: 90%;
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  padding: 20px;
  z-index: 1001;
  position: relative;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  position: relative;
`;

export const Title = styled.h2<{ type: "error" | "success" }>`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  color: ${({ type, theme }) =>
    type === "error" ? theme.colors.light_red : theme.colors.light_blue};
  text-align: center;
`;

export const Content = styled.div`
  padding: 40px 20px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.black};
  text-align: center;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
`;

export const Button = styled.button<{ type: "error" | "success" }>`
  background-color: ${({ type, theme }) =>
    type === "error" ? theme.colors.light_red : theme.colors.light_blue};
  border: none;
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: ${({ type, theme }) =>
      type === "error" ? theme.colors.dark_red : theme.colors.dark_blue};
  }
`;
