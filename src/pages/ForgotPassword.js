import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(""); // 이메일 에러 메시지 상태 추가
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // 이메일을 변경할 때마다 에러 메시지 초기화
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(""); // 폼 제출 시 에러 메시지 초기화

    try {
      // TODO: 실제 프로젝트에서는 여기에 서버 API 호출 로직을 구현
      const response = await fetch("https://example.com/api/check-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.exists) {
          alert(
            "비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요."
          );
          navigate("/");
        } else {
          setEmailError("해당 이메일은 존재하지 않습니다.");
        }
      } else {
        throw new Error("서버 오류");
      }
    } catch (error) {
      setEmailError("이메일 확인에 실패했습니다. 다시 시도해주세요.");
      console.error("이메일 확인 실패:", error);
    }
  };

  return (
    <BasicLayout>
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
          비밀번호 찾기
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일 주소
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black focus:border-black"
              placeholder="이메일을 입력해주세요"
            />
            {emailError && (
              <p className="text-red-500 text-xs mt-2">{emailError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            비밀번호 재설정 링크 보내기
          </button>
        </form>
      </div>
    </BasicLayout>
  );
};

export default ForgotPasswordPage;
