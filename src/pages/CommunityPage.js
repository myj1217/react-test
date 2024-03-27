import React from "react";
import CommunityComponent from "../components/CommunityComponent";
import { FaComment } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const CommunityPage = () => {
    const [queryParams] = useSearchParams();

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1;
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10;

  return (
    <>
      <BasicLayout />
      <div className="flex flex-col w-full">
        {/* "커뮤니티" 헤더 */}
        <div className="h-11 bg-gray-700 text-white flex items-center pl-8 sticky top-0 z-55">
        <FaComment className="w-6 h-6 mr-2" /> 커뮤니티</div>
        {/* 커뮤니티 컴포넌트 */}
        <div className="w-full h-full">
          <CommunityComponent />
        </div>
      </div>
    </>
  );
};

export default CommunityPage;
