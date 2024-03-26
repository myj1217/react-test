import { useEffect, useMemo, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";
import Payment from "../Payment";
import OrderComplete from "../OrderComplete";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems, changeCart, clearCart } = useCustomCart();
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 상태 추가
  const [totalQty, setTotalQty] = useState(0); // 총 수량 상태 추가

  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [showNewModal, setShowNewModal] = useState(false); // 새 모달 상태 추가

  useEffect(() => {
    if (isLogin) {
      refreshCart();
    }
  }, [isLogin]);

  useEffect(() => {
    if (!Array.isArray(cartItems)) {
      return; // cartItems가 배열이 아니면 처리 중단
    }

    // 장바구니에 있는 상품들의 총 가격과 총 수량 계산
    const totalPrice = cartItems.reduce(
      (acc, curr) => acc + curr.price * curr.qty,
      0
    );
    const totalQty = cartItems.reduce((acc, curr) => acc + curr.qty, 0);

    setTotalPrice(totalPrice);
    setTotalQty(totalQty);
  }, [cartItems]);

  const handleCheckout = () => {
    setShowModal(true); // 모달 열기
  };

  const closeModalAndOpenNewModal = () => {
    setShowModal(false); // 기존 모달 닫기
    // 새로운 모달을 열기 위해 showModal 상태를 true로 업데이트
    setShowNewModal(true);
  };

  const handleCloseModal = () => {
    setShowNewModal(false); // 새 모달 닫기
    clearCart(); // 장바구니 비우기
  };

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="w-full flex">
            <div className="font-extrabold text-2xl w-4/5">
              {/* {loginState.nickname}'s Cart */}
              장바구니
            </div>
            <div className="bg-gray-800 text-center text-white font-bold w-1/5 rounded-full m-1">
              상품 종류: {cartItems.length}개
            </div>
          </div>

          <div className="mt-8">
            <ul className="flex justify-evenly text-xl text-center">
              <li className="w-1/12">번호</li>
              {/* <li>checkbox</li> */}
              <li className="w-2/12">이미지</li>
              <li className="w-2/12">상품명</li>
              <li className="w-2/12">판매가</li>
              <li className="w-2/12">수량</li>
              <li className="w-2/12">주문금액</li>
              <li className="w-1/12">삭제</li>
              {/* <li>주문관리</li> */}
              {/* <li>배송비/배송형태</li> */}
            </ul>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>
          </div>
          {/* 전체 수량과 전체 금액 표시 */}
          <div
            className="flex justify-between items-center mt-4"
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <div style={{ marginRight: "30px", fontSize: "20px" }}>
              전체 수량 : {totalQty}개
            </div>
            <div style={{ marginRight: "30px", fontSize: "20px" }}>
              총 금액 : {totalPrice}원
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={handleCheckout}
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
              style={{
                width: "200px",
                height: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              전체 상품 주문하기
            </button>
          </div>
          {showModal && ( // 모달 표시 조건 추가
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div
                className="bg-white p-8 rounded-lg"
                style={{ width: "400px", height: "600px", zIndex: 9999999 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Payment
                    totalPrice={totalPrice}
                    closeModal={closeModalAndOpenNewModal}
                  />{" "}
                  {/* Payment 컴포넌트 렌더링 */}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
      {showNewModal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-pink-100 p-4 rounded-lg">
            <div
              className="bg-white p-8 rounded-lg"
              style={{
                width: "600px",
                height: "800px",
                zIndex: 9999999,
                border: "1px solid #ccc", // 회색 테두리 추가
              }}
            >
              <div className="text-center font-bold text-xl mb-4">
                <h1
                  style={{
                    fontSize: "40px",
                    marginBottom: "30px",
                  }}
                >
                  주문 내역 확인
                </h1>
              </div>
              <OrderComplete
                totalPrice={totalPrice}
                closeModal={closeModalAndOpenNewModal}
              />
              <button
                onClick={handleCloseModal}
                className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
                style={{
                  width: "200px",
                  height: "35px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
