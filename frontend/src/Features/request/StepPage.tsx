import { useAppDispatch, useAppSelector } from '../../redux/store';
import Selectors from './Selectors';
import before from '../../images/go-back.png';

import { useState } from 'react';
import { setStep } from '../stepper/selectSlice';

function StepPage(): JSX.Element {
  const steps_array = useAppSelector((store) => store.steps.steps);
  const current_step = useAppSelector((store) => store.steps.current_step);
  const [progress, setProgress] = useState(0);
  const dispatch = useAppDispatch();
  
  const handleGoBack = (): void => {
    // if (current_step === 1 && Number(ageYears) < 14) {
    // } else if (isLast) {
    setProgress(progress - 25);
    dispatch(setStep(-2));
    // dispatch(setRequest(value));
  }
  return (
    <>
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ width: `${progress}%` }}></div>
    </div>
      <h1>{steps_array[current_step].question}</h1>
      <button type='button' onClick={handleGoBack}> <img className='go-back-img' src={before} alt="go_back_button"/></button>
      <Selectors progress={progress} setProgress={setProgress} />
    </>
  );
}
export default StepPage;
