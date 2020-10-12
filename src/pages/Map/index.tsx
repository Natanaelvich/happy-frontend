import React from 'react';

import { FaPlus } from 'react-icons/fa';
import { Map, TileLayer } from 'react-leaflet';
import { Container, ButtonPlus } from './styles';

import 'leaflet/dist/leaflet.css';

import marcker from '../../assets/Local.svg';

const MapOrphanages: React.FC = () => {
  return (
    <Container>
      <aside>
        <header>
          <img src={marcker} alt="marcker" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Timbiras</strong>
          <span>Maranhão</span>
        </footer>
      </aside>

      <Map
        center={[-4.2522844, -43.9350125]}
        zoom={15}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
      </Map>
      <ButtonPlus to="#teste">
        <FaPlus size={32} color="#fff" />
      </ButtonPlus>
    </Container>
  );
};

export default MapOrphanages;
