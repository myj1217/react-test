import React from "react";
import CheckOutComponent from "../../components/member/CheckOutComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const CheckOutPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />
      <div
        className="w-full h-full overflow-auto"
        style={{ marginTop: "150px" }}
      ></div>

      <div className="flex justify-center items-center w-full h-full">
        <div className="border-2 max-w-[768px] w-full h-auto p-4">
          <CheckOutComponent />
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
