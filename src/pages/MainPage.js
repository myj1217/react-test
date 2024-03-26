import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
  return (
    <BasicLayout>
      <div
        className="
        flex-row p-10
        bg-main bg-cover bg-no-repeat
        w-full h-full"
      >
        <div className="flex w-full h-48"></div>
        <h2
          className="
          mt-20
          text-white text-5xl font-medium text-center"
        >
          니모내모에서
          <br />
          당신의 공간을 채워보세요
        </h2>
        <button
          className="
          flex w-48 h-16 text-xl my-10
          bg-transparent hover:bg-white text-white font-semibold hover:text-black py-4 px-8 mx-auto 
          border border-white hover:border-transparent rounded brightness-200"
        >
          <Link to={"/products/"}>지금 쇼핑하기</Link>
        </button>
        <div className="flex w-full h-48"></div>
      </div>
      <div
        className="
        flex-row p-10
        bg-sub bg-cover bg-no-repeat
        w-full h-full"
      >
        <div className="flex w-full h-48"></div>
        <h2
          className="
          mt-20
          text-white text-5xl font-medium text-center"
        >
          니모내모에서
          <br />
          당신의 취향을 찾아드립니다
        </h2>
        <button
          className="
          flex w-48 h-16 text-xl my-10
          bg-transparent hover:bg-white text-white font-semibold hover:text-black py-4 px-8 mx-auto 
          border border-white hover:border-transparent rounded brightness-200"
        >
          <Link to={"/"}>지금 검색하기</Link>
        </button>
        <div className="flex w-full h-48"></div>
      </div>
    </BasicLayout>
  );
};

export default MainPage;
