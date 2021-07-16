import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Landing.module.css';
import Home from '../Home/Home';

export default function Landing() {
  return (
    <main>
      <Link to={Home} className={Style.link}>Enter</Link>
    </main>
  );
}
