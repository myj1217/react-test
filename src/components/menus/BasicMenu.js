import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaCamera,
  FaCaretDown,
  FaFacebook,
  FaInstagram,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import "@tensorflow/tfjs";
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const loginState = useSelector((state) => state.loginSlice);
  const [model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [isImageSelected, setIsImageSelected] = useState(false); // 이미지가 선택되었는지 여부를 추적하는 상태 변수
  const { doLogout, moveToPath } = useCustomLogin();
  const clickLogout = () => {
    doLogout();
    moveToPath("/");
  };
  useEffect(() => {
    const loadModel = async () => {
      setIsLoading(true);
      try {
        const mobilenetModel = await mobilenet.load();
        setModel(mobilenetModel);
        console.log("Model loaded.");
      } catch (error) {
        console.error("Load model error:", error);
        setError("Failed to load the model.");
      }
      setIsLoading(false);
    };
    loadModel();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.error("No file selected.");
      setError("No file selected.");
      // 이미지 선택되지 않았을 때는 isImageSelected 상태를 변경하지 않음
      return;
    }
    setIsImageSelected(true);
    setError("");
    setIsLoading(true);

    try {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const predictions = await model.classify(img);
        console.log(predictions);
        determineCategory(predictions);
        setIsLoading(false);
      };
    } catch (error) {
      console.error("Error during image classification:", error);
      setError("Error during image classification.");
      setIsLoading(false);
    }
  };

  const determineCategory = (predictions) => {
    const goodsKeywords = [
      "clothes",
      "shirt",
      "pants",
      "dress",
      "coat",
      "hat",
      "shoes",
      "boots",
      "cup",
      "plate",
      "bottle",
      "towel",
    ];
    const decorKeywords = [
      "craft",
      "ceramics",
      "pottery",
      "weaving",
      "knitting",
      "embroidery",
      "apple",
      "dog",
    ];
    const labels = predictions.map((prediction) =>
      prediction.className.toLowerCase()
    );

    if (
      labels.some((label) =>
        goodsKeywords.some((keyword) => label.includes(keyword))
      )
    ) {
      setCategory("굿즈");
    } else if (
      labels.some((label) =>
        decorKeywords.some((keyword) => label.includes(keyword))
      )
    ) {
      setCategory("장식품");
    } else {
      setCategory("그림");
    }
  };

  return (
    <nav id="menu" className="bg-gray-900 text-white">
      <div id="top" className="flex">
        <div id="sns" className="w-1/3 flex space-x-4 p-4 text-xl">
          <FaTwitter className="cursor-pointer" />
          <FaFacebook className="cursor-pointer" />
          <FaInstagram className="cursor-pointer" />
        </div>
        <div id="logo" className="w-1/3 p-6">
          <p className="text-5xl text-center">
            <Link to={"/"}>니모내모</Link>
          </p>
        </div>
        <div id="account" className="w-1/3 flex justify-end p-4">
          {!loginState.email ? (
            <ul className="flex space-x-1 font-medium text-xs">
              <li className="pl-3">
                <Link to={"/member/login"}>로그인</Link>
              </li>
            </ul>
          ) : (
            <ul className="flex space-x-1 font-medium text-xs">
              <li className="pl-3">
                <Link to={"/cart"}>장바구니</Link>
              </li>
              <li className="pl-3">
                <Link to={"/member/mypage"}>마이페이지</Link>
              </li>
              <li className="pl-3">
                <a onClick={clickLogout} style={{ cursor: "pointer" }}>
                  로그아웃
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>

      <div id="mid" className="flex justify-center mb-4">
        <div className="relative w-full max-w-xl">
          <input
            className="pl-10 pr-4 py-2 w-full bg-gray-900 border-2 border-gold-500 text-white placeholder-gray-500 rounded-full focus:outline-none focus:border-gold-600"
            placeholder="검색..."
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          <label
            htmlFor="imageUpload"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gold-500 hover:text-gold-400 cursor-pointer"
          >
            <FaCamera className="absolute right-7 top-1/2 transform -translate-y-1/2 cursor-pointer" />
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={!model || isLoading}
            className="hidden"
            id="imageUpload"
          />
        </div>
      </div>

      <div className="text-center mt-4 bg-gray-900">
        {isImageSelected &&
          (isLoading ? (
            <p>분석 중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <p className="text-yellow-500">추천 카테고리: {category}</p>
          ))}
      </div>

      <div id="bot" className="flex-row">
        <div className="flex p-4 justify-center space-x-10 font-medium text-base">
          <div className="pr-4">
            <Link to={"/products/"}>상품 전체보기</Link>
          </div>
          <div className="relative group">
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
          </div>
          <div className="pr-4">
            <Link to={"/comunity"}>커뮤니티</Link>
          </div>
          <div className="pr-4">
            <Link to={"/month"}>이달의 아티스트</Link>
          </div>
          <div className="pr-4">
            <Link to={"/about"}>고객센터</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BasicMenu;
