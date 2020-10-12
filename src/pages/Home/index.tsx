import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

import { Link } from 'react-router-dom';
import { Container, ContentWrapper, EnterApp, Location } from './styles';
import Logo from '../../assets/Logo.svg';

const Home: React.FC = () => {
  return (
    <Container>
      <ContentWrapper>
        <img src={Logo} alt="" />

        <main>
          <h1>Leve a felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <Link to="map">
          <EnterApp>
            <FaArrowRight color="#8D734B" size={24} />
          </EnterApp>
        </Link>
        <Location>
          <strong>Timbiras</strong>
          Maranhão
        </Location>
      </ContentWrapper>
    </Container>
  );
};

export default Home;
