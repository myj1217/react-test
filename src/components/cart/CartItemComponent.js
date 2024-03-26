import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { API_SERVER_HOST } from "../../api/todoApi";

// 서버 호스트 정보를 사용하여 이미지 URL 생성
const host = API_SERVER_HOST;

const CartComponent = ({ changeCart, email }) => {
  const [cartItems, setCartItems] = useState([
    // 예시 데이터, 실제 애플리케이션에서는 API 호출을 통해 받아올 데이터
    {
      cino: 1,
      pname: "상품 A",
      price: 20000,
      qty: 1,
      imageFile: "product-a.jpg",
    },
    {
      cino: 2,
      pname: "상품 B",
      price: 15000,
      qty: 2,
      imageFile: "product-b.jpg",
    },
    // 추가 상품 데이터...
  ]);
  const navigate = useNavigate();

  const handleRemoveFromCart = (cino) => {
    setCartItems(cartItems.filter((item) => item.cino !== cino));
    changeCart({ email, cino, qty: 0 }); // 백엔드에서 카트 아이템 제거
  };

  const handleQuantityChange = (cino, delta) => {
    const updatedItems = cartItems.map((item) =>
      item.cino === cino
        ? { ...item, qty: Math.max(1, item.qty + delta) }
        : item
    );
    setCartItems(updatedItems);

    const updatedItem = updatedItems.find((item) => item.cino === cino);
    changeCart({ email, cino, pno: updatedItem.pno, qty: updatedItem.qty }); // 백엔드에 수량 변경 정보 업데이트
  };

  const handleCheckout = () => {
    navigate("/member/checkout");
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.qty, 0)
      .toLocaleString();
  };

  return (
    <div className="mx-auto mt-10 p-5 bg-white shadow-xl rounded-xl max-w-4xl">
      <div className="flex items-center justify-center mb-6">
        <FaShoppingCart size={24} className="text-green-500" />
        <h2 className="ml-2 text-2xl font-semibold">장바구니</h2>
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
              <img
                src={`${host}/api/products/view/s_${item.imageFile}`}
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckout}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default CartComponent;
