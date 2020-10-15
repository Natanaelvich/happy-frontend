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

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    label {
      display: flex;
      color: #8fa7b3;
      margin-bottom: 8px;
      line-height: 24px;
      font-size: 24px;
    }

    input {
      max-width: 460px;
      width: 100%;
      background: #f5f8fa;
      border: 1px solid #d3e2e5;
      border-radius: 20px;
      outline: none;
      color: #5c8599;
      height: 44px;
      padding: 0 16px;
    }

    button {
      margin-top: 12px;
      border-radius: 20px;
      height: 44px;
      cursor: pointer;
      background: #edfff6;
      border: 1px solid #a1e9c5;
      color: #37c77f;
      max-width: 460px;
      width: 100%;
    }
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
