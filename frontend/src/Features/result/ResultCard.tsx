import React from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { addFavorite } from '../favorite/favoriteSlice';
import { useNavigate } from 'react-router-dom';
import '../card.css';

function ResultCard({ tovar }: { tovar: string }): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.auth);
  const onHandleAdd = () => {
    dispatch(addFavorite(tovar));
  };
  const ozonHref = `https://www.ozon.ru/search/?text=${tovar}&from_global=true`;
  return (
    <>
      {tovar && (
        <div className="tovar-card">
          {tovar ? (
            <>
              <div className="tovar-card__title">{tovar}</div>
              <div>
                <button className="buttofav buttons blob-btn">
                  {' '}
                  <a href={ozonHref}> Купить </a>
                </button>
                {user && (
                  <button
                    className="buttofav blob-btn"
                    onClick={onHandleAdd}
                    type="button"
                  >
                    Добавить в избранное
                  </button>
                )}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
}

export default ResultCard;
