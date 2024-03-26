import { useEffect, useState } from "react";
import { getOne } from "../../api/productsApi";
import { API_SERVER_HOST } from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import FetchingModal from "../common/FetchingModal";
import useCustomCart from "../../hooks/useCustomCart";
import useCustomLogin from "../../hooks/useCustomLogin";

const initState = {
  pno: 0,
  pname: "",
  pdesc: "",
  price: 0,
  uploadFileNames: [],
};

const host = API_SERVER_HOST;

const ReadComponent_c = ({ pno }) => {
  const [product, setProduct] = useState(initState);
  //화면 이동용 함수
  const { moveToList, moveToModify } = useCustomMove();
  //fetching
  const [fetching, setFetching] = useState(false);
  // 장바구니 기능
  const { changeCart, cartItems } = useCustomCart();
  // 로그인 정보
  const { loginState } = useCustomLogin();

  const handleClickAddCart = () => {
    let qty = 1;

    const addedItem = cartItems.filter((item) => item.pno === parseInt(pno))[0];

    if (addedItem) {
      if (
        window.confirm(
          "장바구니에 이미 추가된 상품입니다. 추가하시겠습니까? "
        ) === false
      ) {
        return;
      }
      qty = addedItem.qty + 1;
    }

    changeCart({ email: loginState.email, pno: pno, qty: qty });
    window.alert("장바구니에 성공적으로 추가되었습니다.");
  };

  useEffect(() => {
    setFetching(true);

    getOne(pno).then((data) => {
      setProduct(data);
      setFetching(false);
    });
  }, [pno]);

  return (
    <div className="border-2 border-gray-300 mt-10 m-2 p-4">
      {fetching ? <FetchingModal /> : <></>}

      <div
        id="product_image_zone"
        className="w-full justify-center flex  flex-col m-auto items-center"
      >
        {product.uploadFileNames.map((imgFile, i) => (
          <img
            alt="product"
            key={i}
            className="p-4 w-1/2"
            src={`${host}/api/products/view/${imgFile}`}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상품명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pname}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">가격</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.price.toLocaleString("ko-KR")}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
          <div className="w-1/5 p-6 text-right font-bold">상품설명</div>
          <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">
            {product.pdesc}
          </div>
        </div>
      </div>

      <div
        id="product_read_buttons"
        className="flex justify-end p-4 text-sm text-white"
      >
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 bg-gray-800"
          onClick={handleClickAddCart}
        >
          장바구니에
          <br />
          담기
        </button>
        <button
          type="button"
          className="inline-block rounded p-4 m-2 w-32 bg-gray-800"
          onClick={() => moveToModify(pno)}
        >
          상품정보
          <br />
          수정
        </button>
        {/* <button
          type="button"
          className="rounded p-4 m-2 w-32 bg-gray-800"
          onClick={moveToList}
        >
          목록으로
          <br />
          돌아가기
        </button> */}
      </div>
    </div>
  );
};

export default ReadComponent_c;
