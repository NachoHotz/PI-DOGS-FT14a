import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Landing.module.css';

export default function Landing() {
  return (
    <div className={Style.landingBody}>
      <div>
        <h2 className={Style.title}>The dogs wiki</h2>
        <Link to="/home/">
          <button className={Style.link}>Enter</button>
        </Link>
      </div>
    </div>
  );
}
