import styled from 'styled-components';

import illustration from '../../assets/Ilustra.svg';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(329.54deg, #29b6d1 0%, #00c7c7 100%);

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-weight: 900;
    font-size: 75px;
    max-width: 360px;
    line-height: 70px;
  }

  p {
    max-width: 360px;
    font-size: 24px;
    line-height: 34px;
    margin-top: 40px;
  }
`;
export const ContentWrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1100px;

  height: 100%;
  max-height: 680px;

  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-between;

  background: url(${illustration}) no-repeat 80% center;

  @media (max-width: 932px) {
    background-size: 300px;
  }
  @media (max-width: 600px) {
    background: none;
  }
`;
export const Location = styled.p`
  position: absolute;
  right: 0;
  top: 0;

  font-size: 24px;
  line-height: 34px;

  display: flex;
  flex-direction: column;
  text-align: right;
`;
export const EnterApp = styled.a`
  position: absolute;
  right: 0;
  bottom: 0;

  width: 80px;
  height: 80px;
  border: 0;

  background: #ffd666;
  border-radius: 30px;

  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;

  &:hover {
    background: #96feff;
  }
`;
