import { useParams } from "react-router-dom";
import ModifyComponent_c from "../../components/c_products/ModifyComponent_c";

const ModifyPage = () => {
  const { pno } = useParams();

  return (
    <div className="p-4 w-full bg-white">
      <div className="text-3xl font-extrabold">상품 수정하기</div>

      <ModifyComponent_c pno={pno} />
    </div>
  );
};

export default ModifyPage;
