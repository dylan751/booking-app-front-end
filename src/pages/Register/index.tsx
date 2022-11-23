import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styles from './Register.module.scss';
import Navbar from '../../components/Navbar';

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/auth/register`,
        credentials,
      );

      navigate('/login');
      setIsLoading(false);
      toast.success('Registered account succeeded');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar type="login" />
      <div className={styles['register']}>
        <div className={styles['register__container']}>
          <div className={styles['register__container__header']}>
            Sign in or create an account
          </div>
          <input
            type="text"
            placeholder="Username"
            id="username"
            onChange={handleInputChange}
            className={styles['register__container__input']}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            onChange={handleInputChange}
            className={styles['register__container__input']}
          />
          <button
            className={styles['register__container__register-btn']}
            onClick={handleRegister}
            disabled={isLoading}
          >
            Register
          </button>
          <span className={styles['login-btn']} onClick={handleNavigate}>
            Sign in to an account
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
