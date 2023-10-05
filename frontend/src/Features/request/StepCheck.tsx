import React, { useState } from 'react';
import './checkbox.css';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { setSelect } from '../stepper/selectSlice';

function StepCheck({ label, i }: { label: string; i: number }) {
  const dispatch = useAppDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const { selectedToApi } = useAppSelector((state) => state.steps);
  console.log(selectedToApi);
  const onHandleClick: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    setIsChecked((prev) => (!prev));
    dispatch(setSelect(i));
  };

  return (
    <div className="check_box__btn">
      <label className="checkbox-btn">
      <input type="checkbox" checked={isChecked} />
        <span onClick={onHandleClick}>{label}</span>
      </label>
    </div>
  );
}
export default StepCheck;

