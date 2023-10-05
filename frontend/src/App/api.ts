import {
  Favorite,
  FavoriteId,
  FavoriteWithOutId,
} from '../Features/favorite/types/favorite';
import { User, UserAuthLog, UserAuthReg } from '../Features/users/types/User';

export const loadUsersFetch = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  return res.json();
};

export const registrationFetch = async (
  value: UserAuthReg
): Promise<{ user: User; message: string }> => {
  const res = await fetch('/api/auth/registration', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
};

export const authorizationFetch = async (
  value: UserAuthLog
): Promise<{ user: User; message: string }> => {
  const res = await fetch('/api/auth/authorization', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
  return res.json();
};

export const authCheckUserFetch = async (): Promise<User> => {
  const res = await fetch('/api/auth/check');
  return res.json();
};

export const logOutFetch = async (): Promise<void> => {
  await fetch('/api/auth/logout');
};

export const favorFetch = async (): Promise<Favorite[]> => {
  const res = await fetch('/api/favorite');
  return res.json();
};

export const forgotFetch = async (
  value: string
): Promise<{ message: string }> => {
  const res = await fetch('/api/auth/forgotpassword', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ value }),
  });
  return res.json();
  // if (!res.ok) {
  //   const data = await res.json();
  //   throw new Error(data.message);
  // }
  // console.log(res.json());
  // return res.json();
};

export const addFavoriteFetch = async (favorite: string): Promise<Favorite> => {
  // console.log(favorite, 'FETCH FAVORITE');
  const res = await fetch('/api/favorite', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify({ favorite }),
  });
  return res.json();
};

export const deleteFavoriteFetch = async (
  value: FavoriteId
): Promise<FavoriteId> => {
  // console.log(favorite, 'FETCH FAVORITE');
  const res = await fetch(`/api/favorite/${value}`, {
    method: 'DELETE',
  });
  return res.json();
};
