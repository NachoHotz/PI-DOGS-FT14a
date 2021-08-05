import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../action/types/dogsActions';
import Style from './BreedDetail.module.css';

export default function BreedDetail() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);
  const { id } = useParams();

  const detail = breeds.filter((breed) => breed.id === id || breed.id === Number(id));

  useEffect(() => {
    dispatch(getBreeds());
  }, []);

  if (detail[0].id.length > 3) {
    detail[0].temperament = '';

    for (let i = 0; i < detail[0].temperaments.length; i++) {
      detail[0].temperament += detail[0].temperaments[i].name.toString() + ', ';
    }
  }

  return (
    <main>
      <section>
        <Link to="/home" className={Style.link}>Back Home</Link>
      </section>
      <section className={Style.container}>
        <img className={Style.image} src={detail[0].image.url} alt="Not found" />
        <section>
          <h3>
            {detail[0].name}
          </h3>
        </section>
        <h4>Height (cm): {detail[0].height.metric}</h4>
        <h4>Weight (kg): {detail[0].weight.metric}</h4>
        <h4>
          Life span: {detail[0].life_span}
        </h4>
        { detail[0].temperament ? <h4>Temperaments: {detail[0].temperament}</h4> : <h4>Temperaments: None</h4> }
      </section>
    </main>
  );
}
