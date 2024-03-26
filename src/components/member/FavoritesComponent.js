import React, { useState, useEffect } from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FavoritesComponent = () => {
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드에서 찜한 상품 데이터를 불러오는 가정
    setFavoriteItems([
      { id: 1, name: "상품 A", imageUrl: "/images/product-a.jpg" },
      { id: 2, name: "상품 B", imageUrl: "/images/product-b.jpg" },
      // 기타 찜한 상품들...
    ]);
  }, []);

  const handleRemoveFavorite = (itemId) => {
    setFavoriteItems(favoriteItems.filter((item) => item.id !== itemId));
  };

  const navigateToProductDetail = (itemId) => {
    navigate(`/product/${itemId}`);
  };

  return (
    <div className="favorites-container mx-auto mt-10 p-5 bg-white shadow-lg rounded-lg max-w-4xl">
      <h2 className="text-3xl font-bold mb-6 flex justify-center items-center">
        <FaHeart className="mr-2 text-pink-500" size={24} />
        찜한 상품
      </h2>
      {favoriteItems.length === 0 ? (
        <div className="text-center">찜한 상품이 없습니다.</div>
      ) : (
        <ul>
          {favoriteItems.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between mb-4 p-4 rounded-lg shadow border"
            >
              <div
                className="flex items-center cursor-pointer"
                onClick={() => navigateToProductDetail(item.id)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-full mr-4"
                />
                <span className="text-lg font-medium">{item.name}</span>
              </div>
              <button
                onClick={() => handleRemoveFavorite(item.id)}
                className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
              >
                <FaTrash size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavoritesComponent;
