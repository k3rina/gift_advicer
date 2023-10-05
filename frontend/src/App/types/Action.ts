import { Favorite } from '../../Features/favorite/types/favorite';
import { User } from '../../Features/users/types/User';

export type Action =
  | { type: 'auth/reg'; payload: User }
  | { type: 'auth/log'; payload: User }
  | { type: 'auth/check'; payload: User }
  | { type: 'auth/logout' }
  | { type: 'favor/init'; payload: Favorite };
