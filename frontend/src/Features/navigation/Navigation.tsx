import React from 'react';
// import './styles/Navigation.scss';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { logOut } from '../auth/authSlice';

function Navigation({
  setModalActive,
}: {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { user } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();

  const onHandleLogOut: React.MouseEventHandler<HTMLAnchorElement> = async (e): Promise<void> => {
    e.preventDefault();
    dispatch(logOut());
  };
  console.log(user?.login);
  return (
    <>
      <div className='nav__container'>
        {!user ? (
          <>
            <ul className='nav__voiti'>
              <li>
                <NavLink className='nav__button ahref' to='/'>
                  <button
                    type='button'
                    className='open-btn'
                    onClick={() => setModalActive(true)}
                  >
                    ВОЙТИ
                  </button>
                </NavLink>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className='nav__menu'>
              <li>ПРИВЕТ, {user.login}</li>
              <li>
                <Link className='ahref' to={'/favorite'}>МOE ИЗБРАННОЕ</Link>
              </li>
              <li>
                <a onClick={onHandleLogOut} className='nav__button ahref' href='/'>
                  ВЫЙТИ
                </a>
              </li>
            </ul>
          </>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Navigation;