export type Favorite = {
  id: number;
  user_id: number;
  nameFavor: string;
};

export type FavoriteId = Favorite['id'];

export type FavoriteState = {
  favorites: Favorite[];
  error: string | undefined;
};

export type FavoriteWithOutId = {
  nameFavor: string;
};
