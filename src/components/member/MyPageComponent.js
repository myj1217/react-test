import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";

const MyPageComponent = () => {
  const navigate = useNavigate();

  const navigateToProfile = () => {
    navigate("/member/edit");
  };

  const navigateToFavorites = () => {
    navigate("/member/favorites");
  };

  const navigateToCart = () => {
    navigate("/member/cart");
  };

  const handleMemberWithdrawal = () => {
    const isConfirmed = window.confirm(
      "정말로 회원 탈퇴를 원하시나요? 이 작업은 되돌릴 수 없습니다."
    );

    if (isConfirmed) {
      // 실제 회원 탈퇴 로직 구현 부분
      // 예: 서버에 탈퇴 요청을 보냄
      alert("회원 탈퇴 처리되었습니다.");
      navigate("/");
    } else {
      console.log("회원 탈퇴가 취소되었습니다.");
    }
  };

  const favoriteItems = [
    { id: 1, name: "찜한 상품 샘플 1", imageUrl: "/path/to/image1.jpg" },
    { id: 2, name: "찜한 상품 샘플 2", imageUrl: "/path/to/image2.jpg" },
    { id: 3, name: "찜한 상품 샘플 3", imageUrl: "/path/to/image3.jpg" },
  ];

  const cartItems = [
    { id: 1, name: "카트상품 샘플 1", imageUrl: "/path/to/image1.jpg" },
    { id: 2, name: "카트상품 샘플 2", imageUrl: "/path/to/image2.jpg" },
    { id: 3, name: "카트상품 샘플 3", imageUrl: "/path/to/image3.jpg" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="bg-gray-500 text-white w-full p-5">
        <div className="text-center">
          <FaUserCircle size="50" className="inline-block" />
          <h1 className="text-xl font-bold mt-2">user1</h1>
          <h2 className="text-xl font-bold mt-2">LV.1회원</h2>

          <div className="flex justify-center gap-4 mb-4">
            <button
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800"
              onClick={navigateToProfile}
            >
              회원정보 변경
            </button>
            <button
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800"
              onClick={navigateToFavorites}
            >
              <FaHeart className="mr-3" />
              찜한 상품
            </button>
            <button
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-800"
              onClick={navigateToCart}
            >
              <FaShoppingCart className="mr-3" />
              장바구니 이동
            </button>
            <button
              className="flex items-center px-3 py-2 rounded-md bg-red-600 hover:bg-red-700"
              onClick={handleMemberWithdrawal}
            >
              <FaSignOutAlt className="mr-3" />
              회원 탈퇴
            </button>
          </div>
        </div>
      </div>
      <div className="flex-grow p-5 bg-white">
        <div className="max-w-full mx-auto">
          <div className="flex flex-col items-center">
            <section className="w-full text-center mb-8">
              <h1 className="text-2xl font-bold mb-5">찜한 상품</h1>
              <ul className="mb-8">
                {favoriteItems.map((item) => (
                  <li key={item.id} className="mb-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-full inline-block mr-3"
                    />
                    {item.name}
                  </li>
                ))}
                <button
                  className="mt-3 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  onClick={navigateToFavorites}
                >
                  찜한 상품 보기
                </button>
              </ul>
            </section>
            <section className="w-full text-center">
              <h1 className="text-2xl font-bold mb-5">카트상품</h1>
              <ul className="mb-8">
                {cartItems.map((item) => (
                  <li key={item.id} className="mb-2">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-10 h-10 rounded-full inline-block mr-3"
                    />
                    {item.name}
                  </li>
                ))}
                <button
                  className="mt-3 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  onClick={navigateToCart}
                >
                  카트 보기
                </button>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageComponent;
