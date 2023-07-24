import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import path from '../../utils/path.util';
import { apiVerifyEmail } from '../../apis';

const VerifyEmail = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVerifyEmail = async () => {
      const result = await apiVerifyEmail(token);
      console.log(result);
      if (result?.success) {
        Swal.fire('Congratudation!', result?.message, 'success').then(() => {
          navigate(`/${path.LOGIN}`);
        });
      } else {
        Swal.fire('Opp!', result?.message, 'error').then(() => {
          navigate(`/${path.LOGIN}`);
        });
      }
    };

    fetchVerifyEmail();
  }, []);

  return <div className="h-screen w-screen bg-gray-100"></div>;
};

export default VerifyEmail;
