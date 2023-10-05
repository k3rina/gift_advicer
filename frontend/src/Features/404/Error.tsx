import React from 'react';
import cat from './pictures/cat.jpg';
import { useNavigate } from 'react-router-dom';

function Error(): JSX.Element {
  const navigate = useNavigate();
  return (
    <div className="container-error">
      <div className="error">
        <div className="number-4">4</div>
        <img src={cat} alt="cat" />
        <div className="number-4">4</div>
      </div>
      <p
        style={{
          fontSize: '25px',
          color: 'white',
        }}
        className="text-block"
      >
        Такой страницы у нас нет...
      </p>
      <button
        className="buttons blob-btn"
        onClick={() => navigate('/')}
        type="button"
      >
        На главную
      </button>
    </div>
  );
}

export default Error;
