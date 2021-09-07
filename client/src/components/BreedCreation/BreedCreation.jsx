import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createBreed } from '../../redux/actions/types/breedActions';
import { getTemperaments } from '../../redux/actions/types/temperamentActions';
import Style from './BreedCreation.module.css';

function validateFormData(input) {
  const errors = {};

  if (!input.name) {
    errors.name = 'The name is required';
  } else {
    errors.name = '';
  }

  if (!input.height) {
    errors.height = 'The height is required';
  }

  if (!input.weight) {
    errors.weight = 'The weight is required.';
  }

  if (!input.life_span) {
    errors.life_span = 'The lifespan is required';
  }

  return errors;
}

export default function Create() {
  const [errors, setErrors] = useState({});
  const [breed, setBreed] = useState({
    name: '',
    height: '',
    weight: '',
    life_span: '',
    image: '',
    temperament: [],
  });

  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);

  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  const handleInputChange = (e) => {
    setBreed({
      ...breed,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validateFormData({
        ...breed,
        [e.target.name]: e.target.value,
      }),
    );
  };

  const handleTempChange = (e) => {
    if (breed.temperament.includes(Number(e.target.value))) {
      return alert(
        'You have already selected that temperament, plase select another one.',
      );
    }

    setBreed((prev) => ({
      ...prev,
      temperament: [...prev.temperament, Number(e.target.value)],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!errors.name && !errors.height && !errors.weight && !errors.life_span) {
      dispatch(createBreed(breed));
      alert('Breed created successfully');
      setBreed({
        name: '',
        height: '',
        weight: '',
        life_span: '',
        image: '',
        temperament: [],
      });
    } else {
      alert('Error =', errors);
    }
  };
  return (
    <main className={Style.body}>
      <section>
        <Link to="/home/" className={Style.link}>
          Back Home
        </Link>
        <form onSubmit={handleSubmit} className={Style.form}>
          <section>
            <label>Name: </label>
            <input
              name="name"
              type="text"
              onChange={handleInputChange}
              value={breed.name}
              required
            />
            <p className={Style.error}>{errors.name}</p>
          </section>
          <section>
            <label>Height: </label>
            <input
              name="height"
              type="text"
              placeholder="Height (min-max in cm)"
              onChange={handleInputChange}
              value={breed.height}
              required
            />
            <p className={Style.error}>{errors.height}</p>
          </section>
          <section>
            <label>Weight: </label>
            <input
              name="weight"
              type="text"
              placeholder="Weight (min-max in kg)"
              onChange={handleInputChange}
              value={breed.weight}
              required
            />
            <p className={Style.error}>{errors.weight}</p>
          </section>
          <section>
            <label>Lifespan: </label>
            <input
              name="life_span"
              type="text"
              placeholder="Lifespan + 'years'"
              onChange={handleInputChange}
              value={breed.life_span}
              required
            />
            <p className={Style.error}>{errors.life_span}</p>
          </section>
          <section>
            <label>Image: </label>
            <input
              name="image"
              type="text"
              placeholder="link/url"
              onChange={handleInputChange}
              value={breed.image}
            />
          </section>
          <p className={Style.select}>
            Select Temperaments (your new dog can have more than one or none):
          </p>
          <select
            key={temperaments.id}
            className={Style.selectCheck}
            onChange={handleTempChange}
          >
            {temperaments?.map((temp) => (
              <option name="temperaments" value={temp.id} key={temp.id}>
                {temp.name}
              </option>
            ))}
          </select>
          <div>
            {breed.temperament.map((temp) => (
              <h5>{temp}</h5>
            ))}
          </div>
          <button type="submit" className={Style.createbtn}>
            Create
          </button>
        </form>
      </section>
    </main>
  );
}
