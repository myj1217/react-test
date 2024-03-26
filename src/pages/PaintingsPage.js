import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

// 예제 이미지 경로를 실제 프로젝트에 맞는 경로로 변경해야 합니다.
import abstractArt from "../pages/image/abstract-art.jpg";
import landscapeCanvas from "../pages/image/landscape-canvas.jpg";
import contemporaryArt from "../pages/image/contemporary-art.jpg";

const mockPaintings = [
  {
    id: 1,
    name: "추상 아트 페인팅",
    price: 70000,
    imageUrl: abstractArt,
  },
  {
    id: 2,
    name: "풍경화 캔버스 아트",
    price: 85000,
    imageUrl: landscapeCanvas,
  },
  {
    id: 3,
    name: "현대 미술 작품",
    price: 95000,
    imageUrl: contemporaryArt,
  },
];

const PaintingsPage = () => {
  const [paintings, setPaintings] = useState([]);

  useEffect(() => {
    setPaintings(mockPaintings);
  }, []);

  return (
    <BasicLayout>
      <h2 className="text-3xl font-bold mb-8">그림</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paintings.map((painting) => (
          <div
            key={painting.id}
            className="border rounded-lg overflow-hidden shadow-lg transition duration-300 ease-in-out"
          >
            {/* Hover 시 확대 효과 추가 */}
            <img
              src={painting.imageUrl}
              alt={painting.name}
              className="w-full h-64 object-cover transform transition duration-300 ease-in-out hover:scale-110"
            />
            <div className="p-4">
              <h3 className="font-bold text-xl mb-2">{painting.name}</h3>
              <p className="text-gray-700">
                {painting.price.toLocaleString()}원
              </p>
              <Link
                to={`/paintings/${painting.id}`}
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

export default PaintingsPage;
