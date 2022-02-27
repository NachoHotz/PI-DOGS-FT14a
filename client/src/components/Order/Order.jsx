import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Style from './Order.module.css';
import { Sort } from '../../redux/actions/types/sort';

export default function Order() {
  const [method, setMethod] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setMethod(e.target.value);
  };

  if (method) {
    dispatch(Sort(method));
    setMethod('');
  }

  return (
    <section className={Style.ordercontainer}>
      <p>Order By: </p>
      <select name="Sort" onChange={(e) => handleChange(e)}>
        <option value="A-Z">A - Z</option>
        <option value="Z-A">Z - A</option>
        <option value="Light">Weigth - to +</option>
        <option value="Heavy">Weight + to -</option>
      </select>
    </section>
  );
}
