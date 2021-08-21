import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBreeds } from '../../redux/actions/types/dogActions/getBreeds';
import Nav from '../Nav/Nav';
import Style from './Home.module.css';

export default function Home() {
  const dispatch = useDispatch();
  const breeds = useSelector((state) => state.allBreeds);
  const filteredBreeds = useSelector((state) => state.breedsFiltered);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
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
  const filteredCurrentItems = filteredBreeds.slice(indexOfFirstItem, indexOfLastItem);

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
    current?.map((breed) => {
      if (breed.id.length > 3) {
        breed.temperament = '';

        for (let i = 0; i < breed?.temperaments?.length; i++) {
          breed.temperament += breed.temperaments[i].name.toString() + ', ';
        }
      }
    });

    return (
      <div className={Style.body}>
        {
        current ? (
          current.map((breed) => (
            <div className={Style.container}>
              <Link to={`/home/${breed.id}`}>
                <img className={Style.image} src={breed.image.url} alt="Not found" />
              </Link>
              <h4 className={Style.name}>{breed.name}</h4>
              <h5 className={Style.temperament}>{breed.temperament}</h5>
            </div>
          ))
        ) : (
          <h1 className={Style.loading}>Loading...</h1>
        )
      }
      </div>
    );
  };

  useEffect(() => {
    dispatch(getBreeds());
  }, []);

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
    pageIncrementBtn = <li onClick={handleNextClick}> &hellip;  </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handleNextClick}> &hellip;  </li>;
  }

  return (
    <main>
      <Nav />
      <ul className={Style.pageNumbers}>
        <li>
          <button
            onClick={handlePrevClick}
            disabled={currentPage === pages[0]}
          >
            Prev
          </button>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}
        <li key={currentPage}>
          <button
            onClick={handleNextClick}
            disabled={currentPage === pages[pages.length - 1]}
          >
            Next
          </button>
        </li>
      </ul>
      { filteredBreeds?.length > 0 ? renderBreeds(filteredCurrentItems) : renderBreeds(currentItems) }
    </main>
  );
}
