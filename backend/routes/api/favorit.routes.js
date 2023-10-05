const router = require('express').Router();
const { Favorite } = require('../../db/models');


router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({where:{user_id: req.session.userId}});
    res.json(favorites);
  } catch ({ message }) {
    res.json({ message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { favorite } = req.body;
    const fav = await Favorite.create({
      nameFavor: favorite,
      user_id: req.session.userId,
    });
    res.json( fav );
  } catch ({ message }) {
    res.json({ message });
  }
});

router.delete('/:favoriteId', async (req, res) => {
  try {
    const { favoriteId } = req.params;
    const result = await Favorite.destroy({ where: { id: favoriteId } });
    if (result > 0) {
      res.json(favoriteId);
      return;
    }
    throw new Error();
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;
