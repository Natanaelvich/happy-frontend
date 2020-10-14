import React, { useEffect, useState } from 'react';
// import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo, FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useHistory, useParams } from 'react-router-dom';
import L from 'leaflet';

import mapMarkerImg from '../../assets/Local.svg';

import './orphanage.css';
import api from '../../services/api';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
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
  images: [
    {
      id: string;
      path: string;
      avatar_url: string;
    },
  ];
}

interface OrphanageParans {
  orphanageId: string;
}

const Orphanage: React.FC = () => {
  const { goBack } = useHistory();
  const { orphanageId } = useParams<OrphanageParans>();

  const [orphanage, setOrphanage] = useState<OrphanageProps | undefined>(
    undefined,
  );
  const [imageSelected, setImageSelected] = useState<
    { avatar_url: string } | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrphanage(): Promise<void> {
      try {
        const response = await api.get(`orphanages/${orphanageId}`);

        setOrphanage(response.data);
      } finally {
        setLoading(false);
      }
    }

    loadOrphanage();
  }, [orphanageId]);

  if (loading) {
    return null;
  }

  return (
    <div id="page-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <div className="orphanage-details">
          <img
            src={imageSelected?.avatar_url || orphanage?.images[0].avatar_url}
            alt={orphanage?.name}
          />

          <div className="images">
            {orphanage?.images.map(i => (
              <button
                key={i.id}
                className={
                  imageSelected?.avatar_url === i.avatar_url ? 'active' : ''
                }
                type="button"
                onClick={() => {
                  setImageSelected({ avatar_url: i.avatar_url });
                }}
              >
                <img src={i.avatar_url} alt={orphanage.name} />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage?.name}</h1>
            <p>{orphanage?.about}</p>

            <div className="map-container">
              {orphanage?.latitude && orphanage?.longitude && (
                <Map
                  center={[orphanage.latitude, orphanage.longitude]}
                  zoom={16}
                  style={{ width: '100%', height: 280 }}
                  dragging={false}
                  touchZoom={false}
                  zoomControl={false}
                  scrollWheelZoom={false}
                  doubleClickZoom={false}
                >
                  <TileLayer
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                  />
                  <Marker
                    interactive={false}
                    icon={happyMapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                  />
                </Map>
              )}

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage?.latitude},${orphanage?.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage?.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage?.open_hours}
              </div>
              {orphanage?.open_on_weekends && (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
