/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import L, { LeafletMouseEvent } from 'leaflet';
import { useHistory } from 'react-router-dom';

import { FiArrowLeft, FiPlus } from 'react-icons/fi';

import mapMarkerImg from '../../assets/Local.svg';

import './create-orphanage.css';
import api from '../../services/api';

const happyMapIcon = L.icon({
  iconUrl: mapMarkerImg,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface LocationProps {
  latitude: number;
  longitude: number;
}

const CreateOrphanage: React.FC = () => {
  const { goBack } = useHistory();

  const [location, setLocation] = useState<LocationProps>({
    latitude: 0,
    longitude: 0,
  });

  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instruction, setInstruction] = useState('');
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [open_hours, setOpen_hours] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  function handleSelectImages(e: ChangeEvent<HTMLInputElement>): void {
    if (!e.target.files) {
      return;
    }
    const imagesTemp = Array.from(e.target.files);
    setImages(imagesTemp);

    const selectsImagesPreview = imagesTemp.map(i => {
      return URL.createObjectURL(i);
    });

    setImagesPreview(selectsImagesPreview);
  }

  function handleMapClick(e: LeafletMouseEvent): void {
    const { lat, lng } = e.latlng;

    setLocation({ latitude: lat, longitude: lng });
  }

  async function handleSubmit(e: FormEvent): Promise<void> {
    e.preventDefault();

    const { latitude, longitude } = location;
    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instruction);
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('open_hours', open_hours);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    images.map(i => data.append('images', i));

    await api.post('orphanages', data);
  }

  return (
    <div id="page-create-orphanage">
      <aside>
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map
              onclick={handleMapClick}
              center={[-27.2092052, -49.6401092]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
            >
              <TileLayer
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              {location?.latitude && location?.longitude && (
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[location.latitude, location.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={text => setName(text.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={text => setAbout(text.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
                <input
                  multiple
                  onChange={handleSelectImages}
                  type="file"
                  id="image[]"
                />
                {imagesPreview.map(i => (
                  <img key={i} src={i} alt={i} />
                ))}
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                value={instruction}
                onChange={text => setInstruction(text.target.value)}
                id="instructions"
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Nome</label>
              <input
                value={open_hours}
                onChange={text => setOpen_hours(text.target.value)}
                id="opening_hours"
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  onClick={() => setOpen_on_weekends(true)}
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                >
                  Sim
                </button>
                <button
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpen_on_weekends(false)}
                  type="button"
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
};
export default CreateOrphanage;
