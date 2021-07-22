import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBreeds,
  getTemperaments,
  getBreedsCreator,
  getBreedsByTemp,
} from '../../action/actionTypes';
import Style from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const breeds = useSelector((state) => state.allBreeds);

  const [selectedTemp, setSelectedTemp] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');

  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getBreeds());
  }, []);

  function handleTempChange(e) {
    setSelectedTemp(e.target.value);
  }

  if (selectedTemp) {
    const filtered = [];
    breeds?.forEach((b) => {
      if (b.id.length > 3) {
        b.temperaments.map((t) => (t.name === selectedTemp ? filtered.push(b) : null));
      }
      if (b.temperament?.includes(selectedTemp)) {
        filtered.push(b);
      }
    });
    dispatch(getBreedsByTemp(filtered));
    setSelectedTemp('');
  }

  function handleCreatorChange(e) {
    setSelectedCreator(e.target.value);
  }

  if (selectedCreator) {
    dispatch(getBreedsCreator(selectedCreator));
    setSelectedCreator('');
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <main>
      <section className={Style.filters}>
        <form onSubmit={handleSubmit}>
          <p className={Style.temperament}>Filter by temperament:</p>
          <select value={selectedTemp} className={Style.tempselect} onChange={handleTempChange} name="temperaments">
            {
            temperaments?.map((temp) => (
              <option value={temp.name}>{temp.name}</option>
            ))
          }
          </select>
          <p className={Style.creator}>Filter by creator:</p>
          <select className={Style.creatorSelect} name="creator" onChange={(e) => handleCreatorChange(e)}>
            <option value="all">All</option>
            <option value="created">Created</option>
            <option value="notcreated">Not created</option>
          </select>
        </form>
      </section>
    </main>
  );
}
