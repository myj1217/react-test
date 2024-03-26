import React from "react";
import CartComponent from "../../components/member/CartComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const CartPage = () => {
  return (
    <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />

      <div
        className="w-full h-full overflow-auto"
        style={{ marginTop: "200px" }}
      >
        <CartComponent />
      </div>
    </div>
  );
};

export default CartPage;
