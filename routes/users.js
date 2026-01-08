const router = require('express').Router();
const {
  getUser,
  createUser,
  idUser,
  delUser,
  updateMe,
  updateAvatar,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/:id', idUser);
router.post('/', createUser);
router.delete('/:id', delUser);
router.patch('/:id/me', updateMe);
router.patch('/:id/me/avatar', updateAvatar);

module.exports = router;
