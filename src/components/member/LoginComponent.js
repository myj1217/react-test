import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin";
import { getKakaoLoginLink } from "../../api/kakaoApi";

const initState = {
  email: "",
  pw: "",
};

const LoginComponent = () => {
  const [loginParam, setLoginParam] = useState({ ...initState });
  const { doLogin } = useCustomLogin();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLoginParam((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleClickLogin = async () => {
    const data = await doLogin(loginParam);
    if (data.error) {
      alert("이메일과 패스워드를 다시 확인하세요.");
    } else {
      navigate("/");
    }
  };

  const handleForgotPasswordClick = (e) => {
    e.preventDefault(); // 폼 제출 방지
    navigate("/member/forgot-password");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // 폼 제출 방지
    handleClickLogin(); // 로그인 버튼 클릭과 동일한 동작 수행
  };

  const kakaoLoginLink = getKakaoLoginLink();

  return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          로그인
        </h2>
        <form onSubmit={handleFormSubmit}> 
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={loginParam.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
              placeholder="이메일 주소"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="pw"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              id="pw"
              type="password"
              name="pw"
              value={loginParam.pw}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
              placeholder="비밀번호"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              {/* <input
                id="keepLoggedIn"
                name="keepLoggedIn"
                type="checkbox"
                checked={loginParam.keepLoggedIn}
                onChange={handleChange}
                className="h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
              />
              <label
                htmlFor="keepLoggedIn"
                className="ml-2 block text-sm text-gray-900"
              >
                로그인 유지
              </label> */}
            </div>
            <Link
              to="/member/register"
              className="text-sm text-black hover:underline"
            >
              회원가입
            </Link>
          </div>
          <button
            type="submit"
            onSubmit={handleClickLogin}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            로그인
          </button>
          <div className="mt-4">
            <Link
              to={kakaoLoginLink}
              className="inline-block w-full px-4 py-2 text-center bg-yellow-400 text-black rounded-md hover:bg-yellow-500 focus:outline-none"
            >
              카카오로 로그인
            </Link>
          </div>
          <button
            onClick={handleForgotPasswordClick}
            className="w-full mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            비밀번호 찾기
          </button>
        </form>
      </div>
  );
};

export default LoginComponent;
