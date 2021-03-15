/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { FormEvent, useEffect, useState } from 'react';

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
interface LocationProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const MapOrphanages: React.FC = () => {
  const [orphanages, setOrphanages] = useState<OrphanageProps[]>([]);
  const [cep, setCep] = useState('');
  const [cidadeEstado, setCidadeEstado] = useState('');
  const [location, setLocation] = useState<LocationProps>({
    latitude: -4.2550141,
    longitude: -43.9546262,
  });
  useEffect(() => {
    const locationStorage = localStorage.getItem('@happy:location');
    const cityStorage = localStorage.getItem('@happy:city');

    if (locationStorage) {
      setLocation(JSON.parse(locationStorage));
    }
    if (cityStorage) {
      setCidadeEstado(cityStorage);
    }
  }, []);

  useEffect(() => {
    async function loadOrphanages(): Promise<void> {
      const response = await api.get('orphanages');

      setOrphanages(response.data);
    }

    loadOrphanages();
  }, []);

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    const cidade = await api.post(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=${process.env.REACT_APP_GOOGLE_MAP_TOKEN}`,
    );

    const city = cidade.data.results[0].formatted_address.split(',')[0];

    localStorage.setItem('@happy:city', city);

    setCidadeEstado(city);
    const cityCoords = await api.post(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${city}&key=${process.env.REACT_APP_GOOGLE_MAP_TOKEN}`,
    );

    const locationCoords = cityCoords.data.results[0].geometry.location;

    localStorage.setItem(
      '@happy:location',
      JSON.stringify({
        latitude: locationCoords.lat,
        longitude: locationCoords.lng,
      }),
    );
    setLocation({
      latitude: locationCoords.lat,
      longitude: locationCoords.lng,
    });
  }
  return (
    <Container>
      <aside>
        <header>
          <img src={marcker} alt="marcker" />

          {location.latitude && <h2>Escolha um orfanato no mapa</h2>}
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>{cidadeEstado || 'Cidade ainda não escolhida'}</strong>
        </footer>
      </aside>

      {location.latitude ? (
        <Map
          center={[location?.latitude, location?.longitude]}
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
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="cep">Digite seu CEP</label>
          <input
            id="cep"
            value={cep}
            onChange={text => setCep(text.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      )}
      <ButtonPlus to="orphanage_create">
        <FaPlus size={32} color="#fff" />
      </ButtonPlus>
    </Container>
  );
};

export default MapOrphanages;
