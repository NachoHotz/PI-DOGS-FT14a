import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getBreedsByName } from '../../redux/actions/types/dogActions/getBreedsByName';
import Style from './Searchbar.module.css';

export default function Searchbar() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    if (name === '') return alert('Please type a name');
    dispatch(getBreedsByName(name));
    setName('');
  };

  return (
    <form action="submit">
      <section className={Style.search_container}>
        <input
          value={name}
          type="search"
          placeholder="Name"
          className={Style.search_input}
          onChange={(e) => handleInputChange(e)}
        />
        <button
          type="submit"
          value="Search"
          className={Style.searchbtn}
          onClick={(e) => handleSearchClick(e)}
        >
          Search
        </button>
      </section>
    </form>
  );
}
