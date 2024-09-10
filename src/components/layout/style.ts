import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  gap: 20px;
  padding: 50px 0px;
  width: 100%;
  height: 100%;
  max-width: 860px;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const MenuItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  width: 50px;
  height: 50px;
  border-radius: 50%;

  svg {
    width: 30px;
    fill: white;
  }

  &.logout {
    border-color: ${({ theme }) => theme.colors.light_red};

    svg {
      fill: ${({ theme }) => theme.colors.light_red};
    }
  }
`;
