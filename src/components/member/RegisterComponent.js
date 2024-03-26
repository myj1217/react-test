import React, { useState } from "react";
import { registerMember } from "../../api/registerApi";
import axios from "axios";

const RegisterComponent = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    nickname: "",
    address: "",
    detailAddress: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = async (name, value) => {
    let errorMessage = "";
    switch (name) {
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          errorMessage = "유효하지 않은 이메일 형식입니다.";
        }
        break;
      case "phone":
        if (!/^01([0|1|6|7|8|9])?([0-9]{7,8})$/.test(value)) {
          errorMessage = "유효하지 않은 전화번호 형식입니다.";
        }
        break;
      case "password":
        if (value.length < 10) {
          errorMessage = "비밀번호는 10자리 이상이어야 합니다.";
        }
        break;
      case "confirmPassword":
        if (value !== formValues.password) {
          errorMessage = "비밀번호가 일치하지 않습니다.";
        }
        break;

      case "nickname":
        // 닉네임 유효성 검사 로직
        break;
      default:
        break;
    }

    if (errorMessage) {
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      return;
    } else {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // 중복 확인 (이메일, 닉네임, 전화번호만 해당)
    if (["email", "nickname", "phone"].includes(name)) {
      try {
        const response = await axios.post(
          `http://localhost:8080/api/check-${name}`,
          { value }
        );
        if (response.data) {
          // 서버에서 중복이면 true, 아니면 false를 반환한다고 가정
          setErrors((prev) => ({
            ...prev,
            [name]: `${name}는 이미 사용 중입니다.`,
          }));
        }
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: `오류가 발생했습니다. 다시 시도해주세요.`,
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };
  const openPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let fullAddress = data.address;
        let extraAddress = "";

        if (data.addressType === "R") {
          if (data.bname !== "") {
            extraAddress += data.bname;
          }
          if (data.buildingName !== "") {
            extraAddress +=
              extraAddress !== ""
                ? `, ${data.buildingName}`
                : data.buildingName;
          }
          fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        }

        setFormValues({ ...formValues, address: fullAddress });
      },
    }).open();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 모든 필드에 대한 유효성 검사가 이미 완료되었는지 확인
    if (Object.values(errors).some((error) => error !== "")) {
      alert("입력 오류를 해결해주세요.");
      return;
    }

    // 'confirmPassword'는 백엔드로 전송할 필요가 없으므로 제외
    const { confirmPassword, ...registrationData } = formValues;

    try {
      // API 호출을 통해 회원가입 요청
      const data = await registerMember(registrationData);
      console.log("회원가입 성공:", data);
      alert("회원가입 성공!");
      // 성공 후 처리 로직, 예를 들어 로그인 페이지로 리다이렉션
    } catch (error) {
      console.error("회원가입 실패:", error);
      alert(error.message || "회원가입에 실패하였습니다.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-screen-md p-8 bg-white rounded-lg shadow-xl"
      >
        {/* 이메일 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleChange}
          placeholder="이메일"
          required
        />
        {/* 비밀번호 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleChange}
          placeholder="비밀번호"
          required
        />
        {/* 비밀번호 확인 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="password"
          name="confirmPassword"
          value={formValues.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호 확인"
          required
        />
        {/* 사용자 이름 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="username"
          value={formValues.username}
          onChange={handleChange}
          placeholder="이름"
          required
        />
        {/* 닉네임 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="nickname"
          value={formValues.nickname}
          onChange={handleChange}
          placeholder="닉네임"
          required
        />
        {/* 주소 입력 필드 */}
        <div className="flex mb-4">
          <input
            className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500"
            type="text"
            name="address"
            value={formValues.address}
            placeholder="주소"
            readOnly
          />
          <button
            type="button"
            onClick={openPostcode}
            className="ml-2 bg-orange-500 hover:bg-orange-600 text-white font-bold p-4 rounded-md"
          >
            주소찾기
          </button>
        </div>
        {/* 상세 주소 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="detailAddress"
          value={formValues.detailAddress}
          onChange={handleChange}
          placeholder="상세 주소"
          required
        />
        {/* 전화번호 입력 필드 */}
        <input
          className="w-full p-4 text-lg rounded-md border border-gray-300 focus:border-orange-500 mb-4"
          type="text"
          name="phone"
          value={formValues.phone}
          onChange={handleChange}
          placeholder="핸드폰 번호"
          required
        />
        {/* 회원가입 버튼 */}
        <button
          className="w-full bg-black hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-md transition duration-200"
          type="submit"
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default RegisterComponent;
