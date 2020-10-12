import styled, { css } from 'styled-components';

interface ContainerProps {
  loading: number | undefined;
}

export const Container = styled.div<ContainerProps>`
  button {
    background: #ff9000;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #312e33;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background 0.2s;
    &:hover {
      background: #ff9930;
    }
  }
  ${props =>
    props.loading &&
    css`
      button:disabled {
        background: #ff7239;
        cursor: not-allowed;
      }
    `}
`;
