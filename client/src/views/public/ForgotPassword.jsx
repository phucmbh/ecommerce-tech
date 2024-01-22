import React, { useCallback, useEffect, useState } from 'react';
import logo from '/images/logo.png';
import { Link } from 'react-router-dom';
import path from 'utils/path.util';
import { Button, InputField } from 'components';
import { apiForgotPassword } from 'apis/users.api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [payload, setPayload] = useState({
    email: '',
  });

  const resetPayload = () => {
    setPayload({
      email: '',
    });
  };

  const handleForgotPassword = useCallback(async () => {
    const response = await apiForgotPassword(payload);
    if (response.success) {
      toast.success(response.message);
      // resetPayload();
    } else {
      toast.error(response.message);
    }
  }, [payload]);

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to={`/${path.HOME}`} className="mb-[100px]">
          <img src={logo} alt="logo" className="w-[234px] object-contain" />
        </Link>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Enter email to reset password
            </h1>
            <div className="space-y-4 md:space-y-6">
              <InputField
                type="email"
                value={payload.email}
                setValue={setPayload}
                nameKey="email"
                placeholder="Email"
              />

              <Button
                handleOnClick={handleForgotPassword}
                style="w-full px-4 py-2 text-white bg-main hover:bg-red-700 font-medium rounded-lg text-sm  text-center"
              >
                Submit
              </Button>

              <Link
                to={`/${path.LOGIN}`}
                className="font-medium text-sm text-black hover:underline"
              >
                Go Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
