import { isYupError, parseYupError } from '@/utils/Yup';
import { postData, setAuthCookie } from '@/utils/apiHandlers';
import { loginValidation } from '@/utils/validation';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoEyeSharp } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  // eslint-disable-next-line
  const getLocation = window.location.origin + location.pathname;
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const [credential, setCredential] = useState({
    username: '',
    password: '',
  });

  const [formError, setFormError] = useState({
    username: '',
    password: '',
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setFormError({});
      await loginValidation.validate(credential, {
        abortEarly: false,
      });
      const response = await postData('/user/signin', credential);
      if (response?.status === 200) {
        if (response.data && response.data.ut !== 'USER') {
          // if (
          //   (response?.data.ut === 'MASTER' &&
          //     getLocation === 'https://agent.bigdaddybook.com/login') ||
          //   (response?.data.ut === 'OWNER' &&
          //     getLocation === 'https://admin.bigdaddybook.com/login')
          // ) {
          setAuthCookie();
          Cookies.set('__admin_user__isLoggedIn', response?.data.token);
          localStorage.setItem(
            'isPasswordChanged',
            response?.data?.isPasswordChanged === false ? 'false' : 'true',
          );
          toast.success('Login Successfully');
          navigate(
            response?.data?.isPasswordChanged ? '/' : '/change_password_admin',
          );
          // } else {
          //   toast.error('invalid credentials');
          // }
        } else
          toast.error('Your Login Credentials does not appear to be valid');
      } else {
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setCredential({ ...credential, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#040b1d]">
      <div className="w-[84%] md:w-[600px] h-[450px] shadow-2xl bg-[#071535]  rounded-lg flex justify-center items-center">
        <div className="w-[220px]">
          <div className="w-[233px] h-[100px] mb-[15px]">
            <img
              className="w-full h-full object-contain"
              src="/images/bigdaddy.png"
            />
          </div>
          <div className="w-[233px] h-[35px] flex justify-between items-center relative ">
            <input
              className="px-[4px] text-black w-[233px] h-[35px] outline-none rounded border-white"
              placeholder="Username"
              type="text"
              onChange={handleChange}
              name="username"
            />
            <FaUser className="absolute right-[6px] text-gray-700" />
          </div>
          {formError?.username && (
            <div className="text-14  font-normal  text-red-700">
              {formError?.username}
            </div>
          )}
          <div className="w-[233px] h-[34px] mt-[15px] flex justify-between items-center relative ">
            <input
              className="px-[4px] w-[233px] text-black h-[34px] outline-none rounded border-white"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              name="password"
            />

            {showPassword ? (
              <>
                <IoEyeSharp
                  onClick={handleTogglePassword}
                  className="absolute right-[6px] text-gray-700 text-lg"
                />
              </>
            ) : (
              <>
                {' '}
                <IoEyeOffSharp
                  onClick={handleTogglePassword}
                  className="absolute right-[6px] text-gray-700 text-lg"
                />
              </>
            )}
          </div>
          {formError?.password && (
            <div className="text-14  font-normal  text-red-700">
              {formError?.password}
            </div>
          )}
          <div className="w-[233px] mt-[15px]">
            <button
              onClick={handleLoginSubmit}
              className="w-full text-center py-[4px] rounded text-white text-lg font-medium shadow-2xl bg-[#040b1d]"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
