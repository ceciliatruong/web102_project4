import './CatContainer.css'
import { useState, useEffect } from 'react';
export default function CatContainer({ cat, name, banList, addToBanList }) {
  return (
    <div>
      <h2>{name}</h2>
      <div className='tags-container'>
        <button onClick={() => addToBanList(cat.breed)} className="tag-button">{cat.breed}</button>
        <button onClick={() => addToBanList(cat.origin)} className="tag-button">{cat.origin}</button>
        <button onClick={() => addToBanList(cat.life_span)} className="tag-button">{cat.life_span} Years</button>
      </div>
      <p>{cat.desc}</p>
      <img className='cat-pic' src={cat.img} alt='Cat' />
    </div>
  );
}