import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingBag,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaUser,
  FaCaretDown,
  FaHeart,
} from "react-icons/fa";

const BasicMenu = () => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <FaFacebook
              className="text-gold-500 hover:text-gold-400 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <FaInstagram
              className="text-gold-500 hover:text-gold-400 cursor-pointer"
              onClick={() => navigate("/")}
            />
            <FaTwitter
              className="text-gold-500 hover:text-gold-400 cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          <Link to="/" className="text-3xl font-bold text-gold-500">
            네모네모
          </Link>

          <div className="flex items-center space-x-4">
            <FaShoppingBag
              className="text-gold-500 cursor-pointer"
              onClick={() => navigate("/member/cart")}
            />
            <FaHeart
              className="text-gold-500 cursor-pointer"
              onClick={() => navigate("/member/favorites")}
            />
            <FaUser
              className="text-gold-500 hover:text-gold-400 cursor-pointer"
              onClick={() => navigate("/member/mypage")}
            />
            <button
              onClick={() => navigate("/member/login")}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              로그인
            </button>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-xl">
            <input
              className="pl-10 pr-4 py-2 w-full bg-black border-2 border-gold-500 text-white placeholder-gray-500 rounded-full focus:outline-none focus:border-gold-600"
              placeholder="검색..."
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold-500" />
          </div>
        </div>

        <nav>
          <ul className="flex justify-center space-x-10 text-sm font-medium">
            <li>
              <Link
                to="/"
                className="hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
              >
                홈
              </Link>
            </li>
            <li className="relative group">
              <span
                className="flex items-center hover:underline hover:text-gold-500 transition duration-300 ease-in-out cursor-pointer"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                카테고리 <FaCaretDown className="ml-1" />
              </span>
              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 bg-black text-white py-2 rounded shadow-lg">
                  <ul className="space-y-2">
                    <li>
                      <Link
                        to="/goods"
                        className="block px-4 py-2 hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
                      >
                        굿즈
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/decorations"
                        className="block px-4 py-2 hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
                      >
                        장식품
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/paintings"
                        className="block px-4 py-2 hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
                      >
                        그림
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            <li>
              <Link
                to="/todo"
                className="hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
              >
                커뮤니티
              </Link>
            </li>
            <li>
              <Link
                to="/monthArtist"
                className="hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
              >
                월간 아티스트
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:underline hover:text-gold-500 transition duration-300 ease-in-out"
              >
                고객센터
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default BasicMenu;
