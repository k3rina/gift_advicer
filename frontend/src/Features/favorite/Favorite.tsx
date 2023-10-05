import React from 'react';
import { FavoriteId, Favorite as FavoriteType } from './types/favorite';
import { useAppDispatch } from '../../redux/store';
import { deleteFavorite } from './favoriteSlice';
import '../card.css'

function Favorite({ favorite }: { favorite: FavoriteType }): JSX.Element {
  const dispatch = useAppDispatch();

  const onHandleDell = (value: FavoriteId): void => {
    dispatch(deleteFavorite(value));
  };

  return (
    <div className="tovar-card">
      <div className='text-tovara'>{favorite.nameFavor} </div>
      <button className='buttofav buttons blob-btn' type="button" onClick={() => onHandleDell(favorite.id)}>
        Удалить
      </button>
    </div>
  );
}

export default Favorite;
