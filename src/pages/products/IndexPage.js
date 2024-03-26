import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";
import { useCallback } from "react";

const IndexPage = () => {
  const navigate = useNavigate();

  const handleClickList = useCallback(() => {
    navigate({ pathname: "list" });
  });

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: "add" });
  });
  return (
    <BasicLayout>
      {/* <div className="text-black font-extrabold -mt-10">Products Menus</div> */}

      <div id="product_list" className="flex flex-wrap w-full">
        <Outlet />
      </div>
      <div
        id="product_buttons"
        className="flex flex-row-reverse w-full m-2 p-2 text-lg"
      >
        <div
          className="m-1 p-2 w-30 font-extrabold text-center underline"
          onClick={handleClickList}
        >
          목록으로
        </div>
        <div
          className="m-1 p-2 w-30 font-extrabold text-center underline"
          onClick={handleClickAdd}
        >
          상품 추가
        </div>
      </div>
    </BasicLayout>
  );
};

export default IndexPage;
