import React, { useState, useEffect } from 'react';
//import { useDispatch } from 'react-redux';
import { clearError, registration } from './authSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import './styles/registration.css';
import './styles/modal.css';

function Registration({
  setModalActive,
  setCheck,
}: {
  setModalActive: (value: boolean) => void;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const { error, user } = useAppSelector((store) => store.auth);

  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const dispatch = useAppDispatch();
  console.log(error);
  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(registration({ login, email, password, cpassword }));
  };
  useEffect(() => {
    console.log(user);
    if (user) {
      setModalActive(false);
      setLogin('');
      setEmail('');
      setPassword('');
      setCpassword('');
    }
  }, [user]);
  const onHandleLogin: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLogin(e.target.value);
    dispatch(clearError());
  };
  const onHandleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };
  const onHandlePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    dispatch(clearError());
  };
  const onHandleCpassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setCpassword(e.target.value);
    dispatch(clearError());
  };
  return (
    <div className="wrapper" style={{ paddingTop: '1 rem' }}>
      <div className="container">
        <form
          className="form_style"
          action="#"
          method="POST"
          onSubmit={onHadleSubmit}
        >
          <div>
            <label htmlFor="text" className="label_style">
              Имя{' '}
            </label>
            <div className="input_wrapper">
              <input
                name="text"
                type="text"
                autoComplete="text"
                required
                className="input_style"
                value={login}
                onChange={onHandleLogin}
              />
            </div>
          </div>

          <div className="container">
            <label htmlFor="email" className="label_style">
              Электронная почта
            </label>
            <div className="input_wrapper">
              <input
                value={email}
                onChange={onHandleEmail}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="input_style"
              />
            </div>
          </div>

          <div>
            <div className="wrapper_password">
              <label htmlFor="password" className="label_style">
                Пароль
              </label>
              {/* <div className="password_item">
                <a href="#" className="forgot_password">
                  Забыли пароль?
                </a>
              </div> */}
            </div>
            <div className="input_wrapper">
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input_style"
                value={password}
                onChange={onHandlePassword}
              />
            </div>
          </div>

          <div>
            <div className="wrapper_password">
              <label htmlFor="password" className="label_style">
                Подтвердите пароль{' '}
              </label>
            </div>
            <div className="input_wrapper">
            <input
                value={cpassword}
                onChange={onHandleCpassword}
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="input_style"
              />
            </div>
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            <button type="submit" className="reg_btn">
              Зарегистроваться
            </button>
          </div>
        </form>
        {/* {authError && (
          <span style={{ fontSize: '25px', color: 'black' }}>{authError}</span>
        )} */}
        <p className="mt-10 text-center text-sm text-gray-500">
          У вас уже есть аккаунт?{' '}
          <button
            type="button"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={() => setCheck(true)}
          >
            Авторизироваться
          </button>
        </p>
      </div>
    </div>
  );
}

export default Registration;

