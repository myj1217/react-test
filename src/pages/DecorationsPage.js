import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

import modernLampImage from "../pages/image/modern-lamp.jpg";
import wallClockImage from "../pages/image/wall-clock.jpg";
import candleHolderImage from "../pages/image/candle-holder.jpg";

const mockDecorations = [
  {
    id: 1,
    name: "모던 테이블 램프",
    price: 30000,
    imageUrl: modernLampImage,
  },
  {
    id: 2,
    name: "벽걸이 시계",
    price: 45000,
    imageUrl: wallClockImage,
  },
  {
    id: 3,
    name: "디자인 캔들 홀더",
    price: 15000,
    imageUrl: candleHolderImage,
  },
];

const DecorationsPage = () => {
  const [decorations, setDecorations] = useState([]);

  useEffect(() => {
    setDecorations(mockDecorations);
  }, []);

  return (
    <BasicLayout>
      <h2 className="text-3xl font-bold mb-8">장식품</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decorations.map((decoration) => (
          <div
            key={decoration.id}
            className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out"
          >
            {/* 마우스 호버 시 확대 효과 추가 */}
            <img
              src={decoration.imageUrl}
              alt={decoration.name}
              className="w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{decoration.name}</h3>
              <p className="text-gray-700">
                {decoration.price.toLocaleString()}원
              </p>
              <Link
                to={`/decorations/${decoration.id}`}
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

export default DecorationsPage;
