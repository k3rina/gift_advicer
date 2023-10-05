import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from '../Features/main/MainPage';
import StepPage from '../Features/request/StepPage';
import Error from '../Features/404/Error';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { authCheckUser } from '../Features/auth/authSlice';
import ModalAuth from '../Features/auth/ModalAuth';
import AuthAll from '../Features/auth/AuthAll';
import Navigation from '../Features/navigation/Navigation';
import BeatLoader from 'react-spinners/BeatLoader';
import ResultPage from '../Features/result/ResultPage';
import FavoriteList from '../Features/favorite/FavoriteList';
import ForgotPassword from '../Features/auth/ForgotPassword';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  const [modalActive, setModalActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAppSelector((store) => store.auth);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  useEffect(() => {
    dispatch(authCheckUser());
  }, []);

  return (
    <div className="App">
      <div id="bg-wrap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient
              id="Gradient4"
              cx="50%"
              cy="50%"
              fx="4.56417%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="23s"
                values="0%;5%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stop-color="rgba(255, 94, 0, 1)"></stop>
              <stop offset="100%" stop-color="rgba(255, 94, 0, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient5"
              cx="50%"
              cy="50%"
              fx="2.65405%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="24.5s"
                values="0%;5%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stop-color="rgba(0,0,255, 1)"></stop>
              <stop offset="100%" stop-color="rgba(0,0,255, 0)"></stop>
            </radialGradient>
            <radialGradient
              id="Gradient6"
              cx="50%"
              cy="50%"
              fx="0.981338%"
              fy="50%"
              r=".5"
            >
              <animate
                attributeName="fx"
                dur="25.5s"
                values="0%;5%;0%"
                repeatCount="indefinite"
              ></animate>
              <stop offset="0%" stop-color="rgba(47, 152, 244, 1)"></stop>
              <stop offset="100%" stop-color="rgba(47, 152, 244, 0)"></stop>
            </radialGradient>
          </defs>
          -
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient4)">
            <animate
              attributeName="x"
              dur="20s"
              values="25%;0%;25%"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              dur="21s"
              values="0%;25%;0%"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="17s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient5)">
            <animate
              attributeName="x"
              dur="23s"
              values="0%;-25%;0%"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              dur="24s"
              values="25%;-25%;25%"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="18s"
              repeatCount="indefinite"
            />
          </rect>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#Gradient6)">
            <animate
              attributeName="x"
              dur="25s"
              values="-25%;0%;-25%"
              repeatCount="indefinite"
            />
            <animate
              attributeName="y"
              dur="26s"
              values="0%;-25%;0%"
              repeatCount="indefinite"
            />
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 50 50"
              to="0 50 50"
              dur="19s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
      <div>
        {' '}
        {loading ? (
          <BeatLoader color={'#0000FF'} loading={loading} size={50} />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navigation setModalActive={setModalActive} />
                  <ModalAuth
                    active={modalActive}
                    setModalActive={setModalActive}
                  >
                    <AuthAll setModalActive={setModalActive} />
                  </ModalAuth>
                </>
              }
            >
              <Route
                index
                element={
                  <MainPage
                    active={modalActive}
                    setModalActive={setModalActive}
                  />
                }
              />
              <Route path="/select" element={<StepPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/favorite" element={<FavoriteList />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        )}
      </div>
    </div>
  );
}

export default App;
