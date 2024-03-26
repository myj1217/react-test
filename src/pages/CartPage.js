import React from "react";
import CartComponent from "../components/menus/CartComponent";
import BasicLayout from "../layouts/BasicLayout";

const CartPage = () => {
  return (
    <>
      <BasicLayout />
      <aside className="flex w-full px-5 py-5 bg-white text-black">
        {/* 상단 여백 py-40 wprj flex 제거 */}
        <CartComponent />
      </aside>
    </>
  );
};

export default CartPage;
