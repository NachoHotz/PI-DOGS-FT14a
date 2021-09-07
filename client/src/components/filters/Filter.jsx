import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBreedsByTemp,
  getBreedsCreator,
} from '../../redux/actions/types/breedActions';
import { getTemperaments } from '../../redux/actions/types/temperamentActions';
import Style from './Filter.module.css';

export default function Filter() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  const [selectedTemp, setSelectedTemp] = useState('');
  const [selectedCreator, setSelectedCreator] = useState('');

  useEffect(() => {
    if (temperaments.length === 0) {
      dispatch(getTemperaments());
    } else {
      return null;
    }
  }, []);

  const handleTempChange = (e) => {
    setSelectedTemp(e.target.value);
  };

  if (selectedTemp) {
    dispatch(getBreedsByTemp(selectedTemp));
    setSelectedTemp('');
  }

  const handleCreatorChange = (e) => {
    setSelectedCreator(e.target.value);
  };

  if (selectedCreator) {
    dispatch(getBreedsCreator(selectedCreator));
    setSelectedCreator('');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className={Style.filters_container}>
      <p className={Style.temperament}>Filter by temperament:</p>
      <select
        className={Style.tempselect}
        onChange={handleTempChange}
        name="temperaments"
      >
        {temperaments?.map((temp) => (
          <option key={temp.id} value={temp.name}>
            {temp.name}
          </option>
        ))}
      </select>
      <p className={Style.creator}>Filter by creator:</p>
      <select
        className={Style.creatorSelect}
        name="creator"
        onChange={(e) => handleCreatorChange(e)}
      >
        <option value="all">All</option>
        <option value="created">Created</option>
        <option value="notcreated">Not created</option>
      </select>
    </form>
  );
}
