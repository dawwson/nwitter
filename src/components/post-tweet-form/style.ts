import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.black};
  color: white;
  width: 100%;
  resize: none;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  &::placeholder {
    font-size: 16px;
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.light_blue};
  }
`;

export const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: ${({ theme }) => theme.colors.light_blue};
  text-align: center;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.light_blue};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;

export const AttachFileInput = styled.input`
  display: none;
`;

export const SubmitButton = styled.input`
  background-color: ${({ theme }) => theme.colors.light_blue};
  color: white;
  padding: 10px 0px;
  border-radius: 20px;
  border: none;
  font-size: 16px;
  cursor: pointer;

  &:hover,
  &:active {
    opacity: 0.9;
  }
`;
