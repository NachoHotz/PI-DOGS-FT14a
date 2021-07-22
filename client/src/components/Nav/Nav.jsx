import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Nav.module.css';

export default function Nav() {
  return (
    <header>
      <nav className={Style.navBar}>
        <Link to="/home/creation" className={Style.create}>Create Breed</Link>
      </nav>
    </header>
  );
}
