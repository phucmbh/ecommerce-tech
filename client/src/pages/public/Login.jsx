import React, { useCallback, useState } from 'react';
import logo from '/images/logo.png';
import { Link } from 'react-router-dom';
import path from '../../utils/path.util';
import { Button, InputField } from '../../components';

function Login() {
  const [payload, setPayload] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = useCallback(() => {
    console.log(payload);
  }, [payload]);

  const [isRegister, setIsRegister] = useState(false);

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
              <div className="flex flex-col gap-2">
                {isRegister && (
                  <InputField
                    value={payload.name}
                    setValue={setPayload}
                    nameKey="name"
                    placeholder="Name"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <InputField
                  value={payload.email}
                  setValue={setPayload}
                  nameKey="email"
                  placeholder="Email"
                />
              </div>
              <div className="flex flex-col gap-2">
                <InputField
                  type="password"
                  value={payload.password}
                  setValue={setPayload}
                  nameKey="password"
                  placeholder="Password"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 ">
                      Remember me
                    </label>
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
                <div className="text-sm">
                  <span
                    className="font-medium text-black hover:underline"
                    onClick={() => setIsRegister(false)}
                  >
                    Go Login
                  </span>
                </div>
              ) : (
                <div className="text-sm">
                  <span className="font-light   text-gray-500">
                    Don’t have an account yet?{' '}
                  </span>
                  <span
                    className="font-medium text-black hover:underline"
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
