import { API_SERVER_HOST } from "../../api/todoApi";

const host = API_SERVER_HOST;

const CartItemComponent = ({
  cino,
  pname,
  price,
  pno,
  qty,
  imageFile,
  changeCart,
  email,
}) => {
  const handleClickQty = (amount) => {
    if (qty + amount < 1) {
      if (window.confirm("삭제하시겠습니까?") === false) {
        return;
      }
    }
    changeCart({ email, cino, pno, qty: qty + amount });
  };

  return (
    <li key={cino} className="w-full border-b">
      {/* <div className="w-full border-2"> */}
      <div className="">
        <div className="flex justify-evenly text-xl text-center items-center">
          <div className="w-1/12">{cino}</div>
          {/* <li>checkbox</li> */}
          <div className="w-2/12">
            <img alt="img" src={`${host}/api/products/view/s_${imageFile}`} />
          </div>
          <div className="w-2/12">{pname}</div>
          <div className="w-2/12">{price.toLocaleString("ko-KR")}</div>
          <div className="w-2/12">
            {qty}
            <button
              className="pl-4 bg-white rounded-lg"
              onClick={() => handleClickQty(1)}
            >
              [+]
            </button>
            <button
              className="pl-4 bg-white rounded-lg"
              onClick={() => handleClickQty(-1)}
            >
              [-]
            </button>
          </div>
          <div className="w-2/12">{(qty * price).toLocaleString("ko-KR")}</div>
          <div className="w-1/12">
            {" "}
            <button
              className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-xl text-white w-12 rounded-lg"
              onClick={() => handleClickQty(-1 * qty)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemComponent;
