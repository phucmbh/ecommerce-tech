import React, { useCallback, useEffect, useState } from 'react';
import logo from '/images/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import path from '../../utils/path.util';
import { Button, InputField } from '../../components';
import { apiLogin, apiRegister } from './../../apis/users.api';
import Swal from 'sweetalert2';

import { userActions } from '../../_store';
import { useDispatch } from 'react-redux';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isRegister, setIsRegister] = useState(false);
  const [payload, setPayload] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
  });

  const resetPayload = () => {
    setPayload({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      mobile: '',
    });
  };

  const handleSubmit = useCallback(async () => {
    const { firstName, lastName, mobile, ...data } = payload;
    if (isRegister) {
      const response = await apiRegister(payload);
      console.log(response);
      if (response.success) {
        new Swal('Congratulations', response.message, 'success').then(() => {
          setIsRegister(false);
          resetPayload();
        });
      } else {
        new Swal('Oops!', response.message, 'error');
      }
    } else {
      const response = await apiLogin(data);
      console.log(response);
      if (response.success) {
        dispatch(
          userActions.login({
            isLoggedIn: true,
            token: response.accessToken,
            userData: response.userData,
          })
        );
        navigate(`/${path.HOME}`);
      } else {
        new Swal('Oops!', response.message, 'error');
      }
    }
  }, [payload, isRegister]);

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to={`/${path.HOME}`} className="mb-[100px]">
          <img src={logo} alt="logo" className="w-[234px] object-contain" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              {isRegister ? 'Register' : 'Login'} your account
            </h1>
            <div className="space-y-4 md:space-y-6">
              {isRegister && (
                <div className="flex flex-col gap-6">
                  <div className="flex gap-6">
                    <InputField
                      value={payload.firstName}
                      setValue={setPayload}
                      nameKey="firstName"
                      placeholder="First Name"
                    />
                    <InputField
                      value={payload.lastName}
                      setValue={setPayload}
                      nameKey="lastName"
                      placeholder="Last Name"
                    />
                  </div>
                  <InputField
                    value={payload.mobile}
                    setValue={setPayload}
                    nameKey="mobile"
                    placeholder="Mobile Number"
                  />
                </div>
              )}

              <InputField
                value={payload.email}
                setValue={setPayload}
                nameKey="email"
                placeholder="Email"
              />

              <InputField
                type="password"
                value={payload.password}
                setValue={setPayload}
                nameKey="password"
                placeholder="Password"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center  gap-2">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                    <span className="text-sm text-gray-500">Remember me</span>
                  </div>
                </div>
                <Link
                  to={'/'}
                  className="font-medium text-sm text-black hover:underline"
                >
                  Forgot Password ?
                </Link>
              </div>

              <Button
                name={isRegister ? 'Register' : 'Login'}
                handleOnClick={handleSubmit}
                style="w-full px-4 py-2 text-white bg-main hover:bg-red-700 font-medium rounded-lg text-sm  text-center"
              />

              {isRegister ? (
                <span
                  className=" text-sm font-medium text-black hover:underline"
                  onClick={() => setIsRegister(false)}
                >
                  Go Login
                </span>
              ) : (
                <div className="text-sm">
                  <span className="font-light   text-gray-500">
                    Don’t have an account yet?{' '}
                  </span>
                  <span
                    className="font-medium text-black hover:underline cursor-pointer"
                    onClick={() => setIsRegister(true)}
                  >
                    Create account
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
