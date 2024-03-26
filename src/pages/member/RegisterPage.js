import React from "react";
import RegisterComponent from "../../components/member/RegisterComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const RegisterPage = () => {
  return (
    <div className="flex flex-col h-screen w-full">
      <BasicMenu />

      <div
        className="w-full h-full overflow-auto"
        style={{ marginTop: "160px" }}
      ></div>
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-2xl mx-4 my-8 p-8 bg-white shadow-xl rounded-lg">
          <RegisterComponent />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
