import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import { Container, ButtonPlus } from './styles';

import 'leaflet/dist/leaflet.css';

import marcker from '../../assets/Local.svg';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
  iconUrl: marcker,
  iconSize: [58, 68],

  iconAnchor: [29, 68],

  popupAnchor: [170, 2],
});

interface OrphanageProps {
  latitude: number;
  longitude: number;
  id: string;
  name: string;
  about: string;
  instructions: string;
  open_on_weekends: string;
  open_hours: string;
}

const MapOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);

  useEffect(() => {
    async function loadOrphanages(): Promise<void> {
      const response = await api.get('orphanages');

      setOrphanages(response.data);
    }

    loadOrphanages();
  }, []);

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
        {orphanages.length > 0 &&
          orphanages.map(o => (
            <Marker
              key={o.id}
              icon={mapIcon}
              position={[o.latitude, o.longitude]}
            >
              <Popup
                className="marker-poppup"
                minWidth={240}
                maxWidth={240}
                closeButton={false}
              >
                {o.name}
                <Link to={`Orphanage/${o.id}`}>
                  <FiArrowRight size={20} color="#fff" />
                </Link>
              </Popup>
            </Marker>
          ))}
      </Map>
      <ButtonPlus to="orphanage_create">
        <FaPlus size={32} color="#fff" />
      </ButtonPlus>
    </Container>
  );
};

export default MapOrphanages;
