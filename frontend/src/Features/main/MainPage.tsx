import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import './Main.scss';
import { useAppSelector } from '../../redux/store';

function MainPage({
  active,
  setModalActive,
}: {
  active: boolean;
  setModalActive: (value: boolean) => void;
}): JSX.Element {
  const { user } = useAppSelector((store) => store.auth);

  const dispatch = useDispatch();
  const onHandleStart = () => {
    dispatch({ type: 'set_step', payload: 0 });
  };
  return (
    <>
      {!user ? (
        <h2 style={{ fontSize: '25px', color: 'white' }} className="text-block">
          Не хочу регистрироваться, <br />
          Хочу просто найти подарок
        </h2>
      ) : (
        <h2
          style={{
            fontSize: '25px',
            color: 'white',
          }}
          className="text-block"
        >
          Скорей искать подарки
          <br />
        </h2>
      )}
      {!active && (
        <Link className="blob-btn" onClick={onHandleStart} to="/select">
          Начать подбор
          <span className="blob-btn__inner">
            <span className="blob-btn__blobs">
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
              <span className="blob-btn__blob"></span>
            </span>
          </span>
        </Link>
      )}
      <br />

      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            ></feGaussianBlur>
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 21 -7"
              result="goo"
            ></feColorMatrix>
            <feBlend in2="goo" in="SourceGraphic" result="mix"></feBlend>
          </filter>
        </defs>
      </svg>
    </>
  );
}

export default MainPage;
