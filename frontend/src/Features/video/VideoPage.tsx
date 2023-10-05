import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import videoBack from '../../production_id_3927379 (2160p).mp4';
import './VideoPageStyles.css';

function MainPage(): JSX.Element {
  const dispatch = useDispatch();
  const onHandleStart = () => {
    dispatch({ type: 'set_step', payload: 0 });
  };
  return (
    <div className="video-background">
      <video src={videoBack} autoPlay loop muted />
      <div>
        {/* <a onClick={onHandleStart}> Начать подбор</a> */}
        <Link to="/step">Начать подбор</Link>
      </div>
    </div>
  );
}

export default MainPage;
