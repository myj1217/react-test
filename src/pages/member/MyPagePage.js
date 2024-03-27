import MyPageComponent from "../../components/member/MyPageComponent";
import BasicLayout from "../../layouts/BasicLayout";
import { FaUser,FaArrowAltCircleUp } from "react-icons/fa";

const MyPagePage = () => {

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })}

  return (<div>
      <BasicLayout />
      <div className="flex flex-col w-full">
        {/* "커뮤니티" 헤더 */}
        <div className="h-11 bg-gray-700 text-white flex items-center pl-8 sticky top-0 z-55">
        <FaUser className="w-6 h-6 mr-2" />마이 페이지
      </div>
        <MyPageComponent />
      </div>
    </div>
  );
};

export default MyPagePage;
