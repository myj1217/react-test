import ModifyComponent from "../../components/member/ModifyComponent";
import BasicMenu from "../../components/menus/BasicMenu";

const ModfyPage = () => {
  return (
    <div className="top-0 left-0 z-[1055] flex flex-col h-full w-full">
      <BasicMenu />

      <div className="w-full flex flex-wrap  h-full justify-center  items-center border-2">
        <ModifyComponent />
      </div>
    </div>
  );
};

export default ModfyPage;
