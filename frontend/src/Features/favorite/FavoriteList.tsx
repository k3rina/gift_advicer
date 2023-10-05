import React, { useEffect } from 'react';
import Favorite from './Favorite';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loadFavors } from './favoriteSlice';
import { useNavigate } from 'react-router-dom';

function FavoriteList(): JSX.Element {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((store) => store.auth);

  const { favorites } = useAppSelector((store) => store.favorite);
  useEffect(() => {
    dispatch(loadFavors());
  }, []);
  const navigate = useNavigate();

  return (
    <>
      <button
        className="buttons blob-btn"
        onClick={() => navigate('/')}
        type="button"
      >
        На главную
      </button>
      {user && (
        <div className="fav-cont">
          {favorites.map((favorite) => (
            <Favorite key={favorite.id} favorite={favorite} />
          ))}
        </div>
      )}
    </>
  );
}

export default FavoriteList;
