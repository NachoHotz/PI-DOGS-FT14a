import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import Style from './Nav.module.css';

export default function Nav() {
  return (
    <header className={Style.header}>
      <nav className={Style.navBar_container}>
        <Searchbar />
        <Link to="/home/creation" className={Style.create}>
          Create breed
        </Link>
      </nav>
    </header>
  );
}
