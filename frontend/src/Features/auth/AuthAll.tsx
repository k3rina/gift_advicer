import React, { useState } from 'react';
import Authorization from './Authorization';
import Registration from './Registration';

export default function AuthAll({
  setModalActive,
}: {
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element {
  const [check, setCheck] = useState(true);

  return (
    <div>
      {check ? (
        <Authorization setModalActive={setModalActive} setCheck={setCheck} />
      ) : (
        <Registration setModalActive={setModalActive} setCheck={setCheck} />
      )}
    </div>
  );
}
