import React, { useState } from 'react';
import './styles/registration.css';
import { forgotFetch } from '../../App/api';

function ForgotPassword(): JSX.Element {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const onHadleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    forgotFetch(email).then((data) => setMessage(data.message));
  };

  const onHandleEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.target.value);
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
              name="email"
              autoComplete="email"
              required
              onChange={onHandleEmail}
              type="email"
            />
          </div>

          {message && <div style={{ color: 'red' }}>{message}</div>}
          <button type="submit" className="reg_btn">
            Получить пароль
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
