import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
  width: 100vw;
  height: 100vh;

  position: relative;
  display: flex;

  aside {
    width: 440px;
    background: linear-gradient(329.54deg, #15b6d6 0%, #15d6d6 100%);
    padding: 80px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    h2 {
      font-weight: 800;
      font-size: 40px;
      line-height: 42px;
      margin-top: 64px;
    }

    p {
      line-height: 28px;
      margin-top: 24px;
    }
    footer {
      display: flex;
      flex-direction: column;

      line-height: 24px;

      strong {
        font-weight: 800;
      }
    }
  }

  .marker-poppup .leaflet-popup-content-wrapper {
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 20px rgba(23, 142, 166, 0.16);
    border-radius: 20px;
    margin-left: 12px;
  }
  .marker-poppup .leaflet-popup-content {
    font-weight: bold;
    font-size: 20px;
    line-height: 27px;
    color: #0089a5;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      background: #15c3d6;
      border-radius: 12px;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .marker-poppup .leaflet-popup-tip-container {
    display: none;
  }
`;

export const ButtonPlus = styled(Link)`
  width: 64px;
  height: 64px;

  background: #15c3d6;
  border-radius: 20px;
  transition: background 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  right: 40px;
  bottom: 40px;
  z-index: 999;

  &:hover {
    background: #17d6eb;
  }
`;
