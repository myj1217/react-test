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
          <div className="w-2/12">{price}</div>
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
          <div className="w-2/12">{qty * price}</div>
          <div className="w-1/12">
            {" "}
            <button
              className="bg-gray-700 hover:bg-gray-900 m-1 p-1 text-xl text-white w-12 rounded-lg"
              onClick={() => handleClickQty(-1 * qty)}
            >
              삭제
            </button>
          </div>
          {/* <li>주문관리</li> */}
          {/* <li>배송비/배송형태</li> */}
        </div>
      </div>

      {/* <div className=" m-1 p-1 ">
          <img src={`${host}/api/products/view/s_${imageFile}`} />
        </div>

        <div className="justify-center p-2 text-xl ">
          <div className="justify-end w-full"></div>
          <div>Cart Item No: {cino}</div>
          <div>Pno: {pno}</div>
          <div>Name: {pname}</div>
          <div>Price: {price}</div>
          <div className="flex ">
            <div className="w-2/3">Qty: {qty}</div>
            <div>
              <button
                className="m-1 p-1 text-2xl bg-white w-8 rounded-lg"
                onClick={() => handleClickQty(1)}
              >
                +
              </button>
              <button
                className="m-1 p-1 text-2xl bg-white w-8 rounded-lg"
                onClick={() => handleClickQty(-1)}
              >
                -
              </button>
            </div>
          </div>
          <div>
            <div className="flex text-white font-bold p-2 justify-center">
              <button
                className="m-1 p-1 text-xl text-white bg-black w-12 rounded-lg"
                onClick={() => handleClickQty(-1 * qty)}
              >
                삭제
              </button>
            </div>
            <div className="font-extrabold border-t-2 text-right m-2 pr-4">
              {qty * price}
            </div>
          </div>
        </div> */}
      {/* </div> */}
    </li>
  );
};

export default CartItemComponent;
