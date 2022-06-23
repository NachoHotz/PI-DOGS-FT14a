import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../redux/actions/types/breedActions';
import Style from './BreedDetail.module.css';

export default function BreedDetail() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);
  const params = useParams();

  const { id } = params;

  let detail = breeds.filter(
    (breed) => breed.id === id || breed.id === Number(id),
  );

  useEffect(() => {
    dispatch(getBreeds());
    return () => (detail = {});
  }, []);

  if (detail[0].id.length > 3) {
    detail[0].temperament = '';

    for (let i = 0; i < detail[0].temperaments.length; i++) {
      detail[0].temperament += detail[0].temperaments[i].name.toString() + ', ';
    }
  }

  return (
    <div>
      <aside>
        <Link to="/home" className={Style.link}>
          Back Home
        </Link>
      </aside>
      <section className={Style.main_container}>
        <article className={Style.container}>
          <img src={detail[0].image.url} alt="Not found" />
          <h3>{detail[0].name}</h3>
          <p>Height (cm): {detail[0].height.metric}</p>
          <p>Weight (kg): {detail[0].weight.metric}</p>
          <p>Life span: {detail[0].life_span}</p>
          {detail[0].temperament ? (
            <p>{detail[0].temperament}</p>
          ) : (
            <p>
              Temperaments: <span>None</span>
            </p>
          )}
        </article>
      </section>
    </div>
  );
}
