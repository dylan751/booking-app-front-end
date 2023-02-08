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
    email: '',
    country: '',
    city: '',
    phone: '',
  });
  const [step, setStep] = useState(1);
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
      setIsLoading(false);
    }
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <>
      <Navbar type="register" />
      <div className={styles['register']}>
        {step === 1 && (
          <div className={styles['register__container']}>
            <div className={styles['register__container__header']}>
              Create an account
            </div>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              id="email"
              onChange={handleInputChange}
              className={styles['register__container__input']}
            />
            <input
              type="password"
              placeholder="Password"
              value={credentials.password}
              id="password"
              onChange={handleInputChange}
              className={styles['register__container__input']}
            />
            <button
              onClick={() => setStep(2)}
              className={styles['register__container__next-btn']}
            >
              Next
            </button>
            <span className={styles['login-btn']} onClick={handleNavigate}>
              Sign in to an account
            </span>
          </div>
        )}
        {step === 2 && (
          <div className={styles['register__container']}>
            <div className={styles['register__container__header']}>
              Your Basic Informations
            </div>
            <input
              type="text"
              placeholder="Full Name *"
              value={credentials.username}
              id="username"
              onChange={handleInputChange}
              className={styles['register__container__input']}
            />
            <input
              type="text"
              placeholder="Country *"
              value={credentials.country}
              id="country"
              onChange={handleInputChange}
              className={styles['register__container__input']}
            />
            <input
              type="text"
              placeholder="City *"
              value={credentials.city}
              id="city"
              onChange={handleInputChange}
              className={styles['register__container__input']}
            />
            <input
              type="number"
              placeholder="Phone Number *"
              value={credentials.phone}
              id="phone"
              onChange={handleInputChange}
              className={styles['register__container__input']}
            />
            <button
              onClick={() => setStep(1)}
              className={styles['register__container__previous-btn']}
            >
              Previous
            </button>
            <button
              className={styles['register__container__register-btn']}
              onClick={handleRegister}
              disabled={
                isLoading ||
                !credentials.username ||
                !credentials.password ||
                !credentials.email ||
                !credentials.country ||
                !credentials.city ||
                !credentials.phone
              }
            >
              Register
            </button>
            <span className={styles['login-btn']} onClick={handleNavigate}>
              Sign in to an account
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default Register;
