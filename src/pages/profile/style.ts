import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

export const AvatarUpload = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  overflow: hidden;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.light_blue};
  cursor: pointer;

  svg {
    width: 50px;
  }
`;

export const AvatarImg = styled.img`
  width: 100%;
`;

export const AvatarInput = styled.input`
  display: none;
`;

export const Name = styled.span`
  font-size: 22px;
`;

export const Tweets = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
