import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import HomePage from './pages/HomePage';
import HotelItem from './pages/HotelItem';
import HotelList from './pages/HotelList';
import Login from './pages/Login';
import Register from './pages/Register';
import ReservePage from './pages/ReservePage';
import AllHotelPage from './pages/AllHotelPage';
import UserReservationsPage from './pages/UserReservationsPage';
import UserReservationDetails from './pages/UserReservationDetails';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/hotels" element={<HotelList />} />
        <Route path="/hotels/:id" element={<HotelItem />} />
        <Route path="/reserve/:id" element={<ReservePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservations" element={<UserReservationsPage />} />
        <Route path="/reservations/:id" element={<UserReservationDetails />} />

        <Route path="/all-hotels" element={<AllHotelPage type={'Hotel'} />} />
        <Route
          path="/all-apartments"
          element={<AllHotelPage type={'Apartment'} />}
        />
        <Route path="/all-resorts" element={<AllHotelPage type={'Resort'} />} />
        <Route path="/all-villas" element={<AllHotelPage type={'Villa'} />} />
        <Route path="/all-cabins" element={<AllHotelPage type={'Cabin'} />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;
