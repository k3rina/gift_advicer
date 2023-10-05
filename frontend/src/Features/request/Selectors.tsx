import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import {
  sendRequestFetch,
  setParse,
  setRequest,
  setStep,
} from '../stepper/selectSlice';
import StepButton from './StepButton';
import { useNavigate } from 'react-router-dom';
import StepCheck from './StepCheck';

function Selectors({
  progress,
  setProgress,
}: {
  progress: number;
  setProgress: (value: number) => void;
}): JSX.Element {
  const steps_array = useAppSelector((store) => store.steps.steps);
  const current_step = useAppSelector((store) => store.steps.current_step);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleOk = (value: string): void => {
    const ageYears = value.slice(0, -5);

    if (current_step === 1 && Number(ageYears) < 14) {
      dispatch(setStep(1));
      dispatch(setRequest(value));
      if (progress < 100) {
        setProgress(progress + 25);
      }
    } else if (isLast) {
      dispatch(setRequest(value));
      dispatch(sendRequestFetch());
      setTimeout(() => {
        navigation('/result');
      }, 1000);
      if (progress < 100) {
        setProgress(progress + 25);
      }
    } else {
      dispatch(setStep(0));
      dispatch(setRequest(value));
      if (progress < 100) {
        setProgress(progress + 25);
      }
    }
  };

  const handleSubmitCheckBoxes: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    if (current_step === 2) {
      dispatch(setStep(1));
      dispatch(setParse());
      if (progress < 100) {
        setProgress(progress + 25);
      }
    } else {
      dispatch(setStep(0));
      dispatch(setParse());
      if (progress < 100) {
        setProgress(progress + 25);
      }
    }
  };

  const handleEnd: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    dispatch(sendRequestFetch());
    if (progress < 100) {
      console.log('мы попали в иф');
      setProgress(progress + 25);
      setTimeout(() => {
        navigation('/result');
      }, 3000);
    }
  };

  const rangeAgeStep = current_step === 1;
  const rangeMoneyStep = current_step === 4;
  const hobbySelector = current_step === 2 || current_step === 3;
  const [rangeAgeValue, setAgeRangeValue] = useState(25);
  const [rangeMoneyValue, setMoneyRangeValue] = useState(1000);
  const [isLast, setIsLast] = useState(false);

  useEffect(() => {
    if (steps_array.length - 1 === current_step) {
      setIsLast(true);
    }
  });
  const handleAgeOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setAgeRangeValue(Number(event.target.value));
  };
  const handleMoneyOnChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setMoneyRangeValue(Number(event.target.value));
  };
  const rangeAge = (
    <>
      <input
        value={rangeAgeValue}
        onChange={handleAgeOnChange}
        type="range"
        min={1}
        max={100}
        step={1}
      />
      <div id="range-value">{rangeAgeValue}</div>

      <div>
        <button
          className="buttons blob-btn"
          onClick={(e) =>
            isLast ? handleEnd(e) : handleOk(`${rangeAgeValue.toString()}years`)
          }>
          Подтвердить
        </button>
      </div>
    </>
  );
  const rangeMoney = (
    <>
      <input
        value={rangeMoneyValue}
        onChange={handleMoneyOnChange}
        type="range"
        min={0}
        max={150000}
        step={1000}
      />
      <div id="range-value">{rangeMoneyValue}</div>

      <div>
        <button
          className="buttons blob-btn"
          onClick={() =>
            handleOk(`within ${rangeMoneyValue.toString()} Russian rubles`)
          }>
          ПОДОБРАТЬ ПОДАРКИ
        </button>
      </div>
    </>
  );

  const knopki = (
    <div>
      {steps_array[current_step].answers.map((answ, i) => (
        <StepButton
          onClick={() => handleOk(steps_array[current_step].answers_to_api[i])}
          label={answ}
        />
      ))}
    </div>
  );
  const checkboxes = (
    <div>
      {steps_array[current_step].answers.map((answ, i) => (
        <StepCheck label={answ} i={i} />
      ))}
      <button className="buttons blob-btn" onClick={handleSubmitCheckBoxes}>
        {' '}
        OK{' '}
      </button>
    </div>
  );

  return (
    <div>
      {rangeAgeStep
        ? rangeAge
        : rangeMoneyStep
        ? rangeMoney
        : hobbySelector
        ? checkboxes
        : knopki}
      {/* {isLast && <button className="buttons blob-btn" onClick={(e) => handleEnd(e)}>END</button>} */}
    </div>
  );
}

export default Selectors;
