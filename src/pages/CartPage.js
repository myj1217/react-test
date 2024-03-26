import React from "react";
import CartComponent from "../components/menus/CartComponent";
import BasicMenu from "../components/menus/BasicMenu";

const CartPage = () => {
  return (
    <>
      <BasicMenu />
      <aside className="flex w-full px-5 py-5 bg-white text-black">
        {/* 상단 여백 py-40 wprj flex 제거 */}
        <CartComponent />
      </aside>
    </>
  );
};

export default CartPage;
