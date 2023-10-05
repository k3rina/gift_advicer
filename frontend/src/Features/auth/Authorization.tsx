import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { authorization, clearError } from './authSlice';
import './styles/registration.css';
import Registration from './Registration';

function Authorization({
  setModalActive,
  setCheck,
}: {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setCheck: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const { error, user } = useAppSelector((store) => store.auth);
  // console.log(error, user);
  const navigate = useNavigate();
  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    dispatch(authorization({ email, password }));
    // if (user) {
    //   setModalActive(false);
    //   setEmail('');
    //   setPassword('');
    // }
  };
  // const handleLink = () =>{
  //   set
  // }
  useEffect(() => {
    // console.log(user);
    if (user) {
      setModalActive(false);
      setEmail('');
      setPassword('');
    }
  }, [user]);
  const onHandleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
    dispatch(clearError());
  };
  const onHandlePassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.target.value);
    dispatch(clearError());
  };
  return (
    <div className="wrapper">
      <div className="container">
        <form onSubmit={onHadleSubmit} className="form_style">
          <label className="label_style">Электронная почта</label>
          <div className="input_wrapper">
            <input
              className="input_style"
              value={email}
              id="email"
              name="email"
              autoComplete="email"
              required
              onChange={onHandleEmail}
              type="email"
            />
          </div>

          <div className="wrapper_password">
            <label htmlFor="password" className="label_style">
              Пароль{' '}
            </label>
            <div className="password_item">
              {/* <a
                href="#"
                
                onClick={(e) => {
                  e.preventDefault();
                }}
              > */}
              <Link
                className="forgot_password"
                to={'/forgotpassword'}
                onClick={() => setModalActive(false)}
              >
                Забыли пароль?
              </Link>
              {/* </a> */}
            </div>
          </div>
          <div className="input_wrapper">
            <input
              id="password"
              name="password"
              autoComplete="current-password"
              required
              className="input_style"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <button type="submit" className="reg_btn">
            Войти
          </button>
        </form>

        {/* <div>
          <p className="font-semibold leading-6 text-gray-500 pt-4">
            {authError && authError}
          </p>
        </div> */}

        <p className="mt-10 text-center text-sm text-gray-500">
          У вас ещё нет аккаунта?{' '}
          {/* <a
            href="./Registration"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Зарегистрироваться
          </a> */}
          <button
            type="button"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            onClick={() => setCheck(false)}
          >
            Зарегистрироваться
            </button>
        </p>
      </div>
    </div>
  );
}

export default Authorization;