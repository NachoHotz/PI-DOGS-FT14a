import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../redux/actions/types/breedActions';
import Nav from '../Nav/Nav';
import Filter from '../filters/Filter';
import Order from '../Order/Order';
import Style from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  for (let i = 1; i <= Math.ceil(breeds.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = breeds.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? Style.active : null}
        >
          {number}
        </li>
      );
    }
    return null;
  });

  const renderBreeds = (current) => {
    if (current.length === 0) {
      return <h2 className={Style.noResults}>Loading...</h2>;
    }

    current?.map((breed) => {
      if (breed.id.length > 3) {
        breed.temperament = '';

        for (let i = 0; i < breed?.temperaments?.length; i++) {
          breed.temperament += breed.temperaments[i].name.toString() + ', ';
        }
      }
    });

    return (
      <main className={Style.body}>
        {current.map((breed) => (
          <article key={breed.id} className={Style.container}>
            <Link to={`/home/${breed.id}`}>
              <img
                className={Style.image}
                src={breed.image.url}
                alt="Not found"
              />
            </Link>
            <h4 className={Style.name}>{breed.name}</h4>
            <h5 className={Style.temperament}>{breed.temperament}</h5>
          </article>
        ))}
      </main>
    );
  };

  useEffect(() => {
    dispatch(getBreeds());
  }, [dispatch]);

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextClick}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handleNextClick}> &hellip; </li>;
  }

  return (
    <div>
      <Nav />
      <Filter />
      <Order />
      <ul className={Style.pageNumbers}>
        <button
          onClick={handlePrevClick}
          disabled={currentPage === pages[0]}
          className={
            currentPage === pages[0] || breeds.length === 0
              ? Style.disabled
              : 'active'
          }
        >
          Prev
        </button>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <button
          onClick={handleNextClick}
          disabled={currentPage === pages[pages.length - 1]}
          className={
            currentPage === pages[pages.length - 1] || breeds.length === 0
              ? Style.disabled
              : 'active'
          }
        >
          Next
        </button>
      </ul>
      {renderBreeds(currentItems)}
    </div>
  );
}
