import MyPageComponent from "../../components/member/MyPageComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const MyPagePage = () => {
  return (
    <div className="top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />

      <div className="w-full flex flex-wrap  h-full justify-center  items-center">
        <MyPageComponent />
      </div>
    </div>
  );
};

export default MyPagePage;
