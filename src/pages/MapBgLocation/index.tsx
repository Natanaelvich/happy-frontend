/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState } from 'react';

import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import Leaflet from 'leaflet';
import io from 'socket.io-client';
import { getHours, getMinutes } from 'date-fns';
import { Container } from './styles';

import 'leaflet/dist/leaflet.css';

import marcker from '../../assets/Local.svg';
import api from '../../services/api';

const mapIcon = Leaflet.icon({
  iconUrl: marcker,
  iconSize: [28, 38],

  iconAnchor: [29, 38],

  popupAnchor: [170, 2],
});

interface LocationProps {
  latitude: string;
  longitude: string;
  id: string;
  created_at: Date;
}

const MapBgLocation: React.FC = () => {
  const [locations, setlocations] = useState<LocationProps[]>([]);

  const socket = useMemo(() => {
    return io('https://api.happy.mundotech.dev', {
      query: { user: '123456' },
    });
  }, []);

  useEffect(() => {
    socket.on('location', (location: string) => {
      setlocations(oldLocations => {
        return [
          ...oldLocations,
          {
            ...JSON.parse(location),
            id: String(Date.now()),
            created_at: new Date(Date.now()),
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
          center={[
            Number(locations[0].latitude),
            Number(locations[0].longitude),
          ]}
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
            >
              <Popup
                className="marker-poppup"
                minWidth={240}
                maxWidth={240}
                closeButton={false}
              >
                {getHours(new Date(o.created_at))} {' : '}
                {getMinutes(new Date(o.created_at))} Min
              </Popup>
            </Marker>
          ))}
        </Map>
      )}
    </Container>
  );
};

export default MapBgLocation;
