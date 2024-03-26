import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaMinus,
  FaPlus,
  FaTrash,
  FaCheckSquare,
  FaRegSquare,
} from "react-icons/fa";

const host = "http://localhost:3000";

const CartComponent = ({ changeCart, email }) => {
  const [cartItems, setCartItems] = useState([
    {
      cino: 1,
      pname: "상품 A",
      price: 20000,
      qty: 1,
      imageFile: "product-a.jpg",
      isSelected: false,
    },
    {
      cino: 2,
      pname: "상품 B",
      price: 15000,
      qty: 2,
      imageFile: "product-b.jpg",
      isSelected: false,
    },
    // 추가 상품 데이터...
  ]);
  const [selectAll, setSelectAll] = useState(false);
  const navigate = useNavigate();

  const handleSelectAllChange = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setCartItems(
      cartItems.map((item) => ({ ...item, isSelected: newSelectAll }))
    );
  };

  const handleCheckboxChange = (cino) => {
    const updatedItems = cartItems.map((item) =>
      item.cino === cino ? { ...item, isSelected: !item.isSelected } : item
    );
    setCartItems(updatedItems);
    setSelectAll(updatedItems.every((item) => item.isSelected));
  };

  const handleRemoveFromCart = (cino) => {
    const updatedItems = cartItems.filter((item) => item.cino !== cino);
    setCartItems(updatedItems);
    changeCart({ email, cino, qty: 0 });
    setSelectAll(updatedItems.every((item) => item.isSelected));
  };

  const handleQuantityChange = (cino, delta) => {
    setCartItems(
      cartItems.map((item) =>
        item.cino === cino
          ? { ...item, qty: Math.max(1, item.qty + delta) }
          : item
      )
    );
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.isSelected);
    if (selectedItems.length === 0) {
      alert("결제할 상품을 선택해주세요.");
      return;
    }
    navigate("/member/checkout", { state: { selectedItems } });
  };

  const getTotalPrice = () => {
    return cartItems
      .filter((item) => item.isSelected)
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toLocaleString();
  };

  return (
    <div className="mx-auto mt-10 p-5 bg-white shadow-xl rounded-xl max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FaShoppingCart size={24} className="text-green-500" />
          <h2 className="ml-2 text-2xl font-semibold">장바구니</h2>
        </div>
        <button
          onClick={handleSelectAllChange}
          className="flex items-center text-gray-700 hover:text-gray-900"
        >
          {selectAll ? <FaCheckSquare size={20} /> : <FaRegSquare size={20} />}
          <span className="ml-2">전체 선택</span>
        </button>
      </div>
      {cartItems.length === 0 ? (
        <div className="text-center">장바구니가 비어 있습니다.</div>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.cino}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.isSelected}
                onChange={() => handleCheckboxChange(item.cino)}
                className="mr-4"
              />
              <img
                src={`${host}/api/products/view/${item.imageFile}`}
                className="w-20 h-20 object-cover rounded mr-4"
                alt={item.pname}
              />
              <div>
                <p className="text-lg font-medium">{item.pname}</p>
                <p className="text-gray-500">{`${item.price.toLocaleString()}원`}</p>
              </div>
            </div>
            <div className="flex items-center">
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleQuantityChange(item.cino, -1)}
              >
                <FaMinus />
              </button>
              <span className="mx-2 text-lg">{item.qty}</span>
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => handleQuantityChange(item.cino, 1)}
              >
                <FaPlus />
              </button>
              <button
                className="ml-4 text-red-500 hover:text-red-700"
                onClick={() => handleRemoveFromCart(item.cino)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
      <div className="flex justify-between items-center mt-6">
        <span className="text-xl font-bold">총 금액: {getTotalPrice()}원</span>
        <button
          className="bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckout}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
