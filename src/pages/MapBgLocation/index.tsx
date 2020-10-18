/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState } from 'react';

import { Map, TileLayer, Marker } from 'react-leaflet';
import Leaflet from 'leaflet';
import io from 'socket.io-client';
import { Container } from './styles';

import 'leaflet/dist/leaflet.css';

import marcker from '../../assets/Local.svg';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
  iconUrl: marcker,
  iconSize: [58, 68],

  iconAnchor: [29, 68],

  popupAnchor: [170, 2],
});

interface LocationProps {
  latitude: string;
  longitude: string;
  id: string;
}
interface LocationSocketProps {
  latitude: string;
  longitude: string;
}

const MapBgLocation: React.FC = () => {
  const [locations, setlocations] = useState<LocationProps[]>([]);

  const socket = useMemo(() => {
    return io('https://api.happy.mundotech.dev', {
      query: { user: '123456' },
    });
  }, []);

  useEffect(() => {
    socket.on('location', (location: any) => {
      setlocations(oldLocations => {
        return [
          ...oldLocations,
          {
            ...JSON.parse(location),
            id: String(Date.now()),
          },
        ];
      });
    });
  }, [socket]);

  useEffect(() => {
    async function loadLocations(): Promise<void> {
      const response = await api.get('locations');

      setlocations(response.data);
    }

    loadLocations();
  }, []);

  return (
    <Container>
      {locations.length > 0 && (
        <Map
          center={[-4.2522844, -43.9350125]}
          zoom={15}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />

          {locations.map(o => (
            <Marker
              key={o.id}
              icon={mapIcon}
              position={[Number(o.latitude), Number(o.longitude)]}
            />
          ))}
        </Map>
      )}
    </Container>
  );
};

export default MapBgLocation;
