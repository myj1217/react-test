import React, { useState, useEffect } from "react";

// 예제를 위해 임시로 설정된 사용자 데이터입니다.
const fetchUserData = async () => {
  return Promise.resolve({
    email: "user1@example.com",
    username: "User One",
    nickname: "User1",
    address: "123 Main St",
    detailAddress: "Suite 100",
    phone: "010-1234-5678",
  });
};

const EditComponent = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    username: "",
    nickname: "",
    address: "",
    detailAddress: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    // 사용자 데이터를 불러오는 함수
    fetchUserData().then((data) => {
      // 비밀번호와 비밀번호 확인 필드는 초기화를 제외합니다.
      const { password, confirmPassword, ...userData } = data;
      setFormValues(userData);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 비밀번호 확인 검사
    if (formValues.password !== formValues.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    // 프로필 업데이트 로직을 여기에 구현
    alert("프로필이 성공적으로 업데이트되었습니다.");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg p-10 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          프로필 변경
        </h2>

        {/* 이메일 필드 - 변경 불가 */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            이메일
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            readOnly
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100 cursor-not-allowed"
            aria-describedby="emailHelp"
          />
        </div>

        {/* 나머지 필드 */}
        {Object.entries(formValues).map(([key, value]) =>
          key !== "email" && key !== "password" && key !== "confirmPassword" ? (
            <div key={key} className="mb-6">
              <label
                htmlFor={key}
                className="block text-gray-700 text-sm font-bold mb-2 capitalize"
              >
                {key}
              </label>
              <input
                type="text"
                name={key}
                id={key}
                value={value}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ) : null
        )}

        {/* 비밀번호 변경 필드 */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            비밀번호 확인
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            변경
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditComponent;
