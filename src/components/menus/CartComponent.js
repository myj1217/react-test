import { useEffect, useMemo, useState } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";
import Payment from "../Payment";

const CartComponent = () => {
  const { isLogin, loginState } = useCustomLogin();
  const { refreshCart, cartItems, changeCart } = useCustomCart();
  const [showModal, setShowModal] = useState(false); // 모달 상태 추가
  const [totalPrice, setTotalPrice] = useState(0); // 총 가격 상태 추가
  const [totalQty, setTotalQty] = useState(0); // 총 수량 상태 추가

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

  const closeModal = () => {
    setShowModal(false); // 모달 닫기
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
          <div className="flex justify-between items-center mt-4">
            <div>전체 수량: {totalQty}</div>
            <div>총 금액: {totalPrice.toLocaleString("ko-KR")}원</div>
          </div>
          <button
            onClick={handleCheckout}
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-4"
          >
            전체 상품 주문하기
          </button>
          {showModal && ( // 모달 표시 조건 추가
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-8 rounded-lg">
                <Payment totalPrice={totalPrice} closeModal={closeModal} />{" "}
                {/* Payment 컴포넌트 렌더링 */}
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CartComponent;
