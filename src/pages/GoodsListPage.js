import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import art from "../pages/image/art.jpg"; // 아트 프린트 이미지
import cup from "../pages/image/cup.jpg"; // 디자인 머그컵 이미지
import paint from "../pages/image/paint.jpg"; // 캔버스 그림 이미지

// 상품 정보 목 데이터
const mockGoods = [
  {
    id: 1,
    name: "아트 프린트",
    price: 20000,
    img: art, // 이미지 경로를 직접 할당
  },
  {
    id: 2,
    name: "디자인 머그컵",
    price: 15000,
    img: cup, // 이미지 경로를 직접 할당
  },
  {
    id: 3,
    name: "캔버스 그림",
    price: 50000,
    img: paint, // 이미지 경로를 직접 할당
  },
];

const GoodsListPage = () => {
  const [goods, setGoods] = useState([]);

  useEffect(() => {
    // 상품 데이터를 서버로부터 가져오는 것을 모방
    setGoods(mockGoods);
  }, []);

  return (
    <BasicLayout>
      <h2 className="text-3xl font-bold mb-8">굿즈 상품 리스트</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goods.map((good) => (
          <div
            key={good.id}
            className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out"
          >
            {/* 마우스 호버 시 확대 효과 추가 */}
            <img
              src={good.img}
              alt={good.name}
              className="w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{good.name}</h3>
              <p className="text-gray-700">{good.price.toLocaleString()}원</p>
              <Link
                to={`/goods/${good.id}`}
                className="inline-block bg-black text-white py-2 px-4 rounded mt-4 hover:bg-opacity-80 transition duration-300 ease-in-out"
              >
                자세히 보기
              </Link>
            </div>
          </div>
        ))}
      </div>
    </BasicLayout>
  );
};

export default GoodsListPage;
