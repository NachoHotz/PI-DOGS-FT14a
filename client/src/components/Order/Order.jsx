import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Style from './Order.module.css';
import { Sort } from '../../action/actionTypes';

export default function Order() {
  const [sortMethod, setSortMethod] = useState('');
  const dispatch = useDispatch();

  function handleChange(e) {
    setSortMethod(e.target.value);
  }

  if (sortMethod) {
    dispatch(Sort(sortMethod));
    setSortMethod('');
  }

  return (
    <div className={Style.ordercontainer}>
      <p className={Style.title}>Order By: </p>
      <select name="Sort" onChange={(e) => handleChange(e)} className={Style.selectcontainer}>
        <option value="A-Z">A - Z</option>
        <option value="Z-A">Z - A</option>
        <option value="Light">Weigth - to +</option>
        <option value="Heavy">Weight + to -</option>
      </select>
    </div>
  );
}
