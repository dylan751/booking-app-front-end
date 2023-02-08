import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import styles from './Login.module.scss';
import Navbar from '../../components/Navbar';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch && dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/login`,
        credentials,
      );
      dispatch &&
        dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details });
      navigate('/');
    } catch (err: any) {
      dispatch &&
        dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data });
    }
  };

  const handleNavigate = () => {
    navigate('/register');
  };

  if (error) {
    toast.error(`${error.message}`, { toastId: 'LOGIN_FAILURE' });
  }

  return (
    <>
      <Navbar type="login" />
      <div className={styles['login']}>
        <div className={styles['login__container']}>
          <div className={styles['login__container__header']}>Sign in</div>
          <input
            type="text"
            placeholder="Email"
            id="email"
            onChange={handleInputChange}
            className={styles['login__container__input']}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleInputChange}
            className={styles['login__container__input']}
          />
          <button
            className={styles['login__container__login-btn']}
            onClick={handleLogin}
            disabled={loading}
          >
            Sign in
          </button>
          <span className={styles['signup-btn']} onClick={handleNavigate}>
            Create a new account
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
