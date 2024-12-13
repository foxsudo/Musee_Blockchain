import React from 'react';
import './Cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
      <h1>Decouvrez nos differentes cultures dans l'art!</h1>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='../images/musee6.jpg'
              text='La visite du couple royal de belgique au musee national de la RDC'
              label='Visite Roi de belgique'
              path='/expositions'
            />
            <CardItem
              src='../images/musee7.jpg'
              text='Decouvrez la culture congolaise dans un musee d art en RDC'
              label='Art and culture'
              path='/expositions'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='/images/musee5.jpg'
              text='la culture congolaise par la danse dans un musee d art en RDC'
              label='Dance and Culture'
              path='/expositions'
            />
            <CardItem
              src='/images/musee4.jpeg'
              text='Une visite guidee au musee national de la RDC'
              label='Visite guidée'
              path='/products'
            />
            <CardItem
              src='/images/musee3.jpg'
              text='le couple royal de belgique au musee national de la RDC'
              label='Visite Roi de belgique'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
