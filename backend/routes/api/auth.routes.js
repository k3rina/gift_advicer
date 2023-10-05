const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const mailer = require('../../nodemailer');
const generatepassword = require('generate-password');
require('dotenv').config();
export const { OUR_EMAIL, OUR_EMAIL_PASS } = process.env;


router.post('/registration', async (req, res) => {
  try {
    const { login, email, password, cpassword } = req.body;
    //console.log(req.body);
    let user = await User.findOne({ where: { email } });
    if (!login || !email || !password || !cpassword) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    if (user) {
      res.status(409).json({ message: 'Такой емайл уже занят' });
      return;
    }

    if (password !== cpassword) {
      res.status(409).json({ message: 'Пароли не совпадают' });
      return;
    }
    const hash = await bcrypt.hash(password, 10);
    user = await User.create({ login, email, password: hash });

    req.session.userId = user.id;
    res.status(200).json({ message: 'ok', user });
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

router.post('/authorization', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Заполните все поля' });
      return;
    }
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({
        message: 'Такого пользователя не существует или пароль неверный',
      });
      return;
    }

    const compare = await bcrypt.compare(password, user.password);

    if (!compare) {
      res.status(400).json({
        message: 'Такого пользователя не существует или пароль неверный',
      });
      return;
    }
    req.session.userId = user.id;
    res.json({ message: 'ok', user });
  } catch ({ message }) {
    console.log(req.body);
    console.log(message);
    res.json({ message });
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'Ошибка при удалении сессии' });
    }
    res
      .clearCookie('user_sid') // серверное удаление куки по имени
      .redirect('/');
  });
});

router.post('/forgotpassword', async (req, res) => {
  console.log('dkkk');
  try {
    const { value } = req.body;
    const email = value;
    console.log(email);
    let user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(400).json({
        message: 'Такого пользователя не существует',
      });
      return;
    }
    const newPassword = generatepassword.generate({
      length: 10, // Длина пароля
      numbers: true, // Включить цифры
      symbols: true, // Включить символы
      uppercase: true, // Включить заглавные буквы
      lowercase: true, // Включить строчные буквы
    });
    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;
    user.save();
    const text = {
      from: `Подбор подарков <${OUR_EMAIL}>`,
      to: `${user.email}`,
      subject: 'Сообщение об изменении пароля',
      html: `<p>Нам пришел запрос об изменении пароля.</p>
      <p>Для последующего входа в личный кабинет, используйте обновленный пароль:</p>
      <p>${newPassword}</p>
      <p>С Уважением,</p>
      <p>команда FUCKUPERS </p>`,
    };
    console.log(text);
    mailer(text);
    // console.log(password, user);
    res.json({
      message: 'Для восстановления пароля проверьте вашу электронную почту.',
    });
  } catch ({ message }) {
    // res.json({ message });
    // console.log(message);
  }
});

router.get('/check', async (req, res) => {
  try {
    if (req.session.userId) {
      const user = await User.findOne({ where: { id: req.session.userId } });
      res.json(user);
    }
    res.end({});
  } catch ({ message }) {
    res.json({ message });
  }
});

module.exports = router;