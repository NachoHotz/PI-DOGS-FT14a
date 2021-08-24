import React from 'react';
import { Link } from 'react-router-dom';
import Filters from '../Filters/Filter';
import Order from '../Order/Order';
import Searchbar from '../Searchbar/Searchbar';
import Style from './Nav.module.css';

export default function Nav() {
  return (
    <header>
      <nav className={Style.navBar_container}>
        <Searchbar />
        <Filters />
        <Order />
        <Link to="/home/creation" className={Style.create}>
          Create Breed
        </Link>
      </nav>
    </header>
  );
}
