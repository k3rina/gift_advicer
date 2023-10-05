import React from 'react';
import './styles/modal.css';
import close from './styles/close.svg';

function ModalAuth({
  active,
  setModalActive,
  children,
}: {
  active: boolean;
  setModalActive: (value: boolean) => void;
  children: JSX.Element;
}): JSX.Element {
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setModalActive(false)}
    >
      <div
        className={active ? 'modal_content active' : 'modal_content'}
        onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      >
        <div onClick={() => setModalActive(false)}>
          {' '}
          <img
            src={close}
            width={20}
            className="close-button"
            height={40}
            alt="close"
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export default ModalAuth;
