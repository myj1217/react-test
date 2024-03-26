import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartAsync } from "../slices/cartSlice";

const useCustomCart = () => {
  const cartItems = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();

  const refreshCart = () => {
    dispatch(getCartItemsAsync());
  };

  const changeCart = (param) => {
    if (param.length === 0) {
      // 만약 param이 빈 배열이면 장바구니를 비웁니다.
      // 서버로 요청을 보내어 장바구니를 비우는 동작을 수행할 수 있습니다.
      dispatch(postChangeCartAsync(param));
    } else {
      //     // 장바구니 항목을 변경하는 동작은 그대로 유지합니다.
      dispatch(postChangeCartAsync(param));
    }
  };

  return { cartItems, refreshCart, changeCart };
};

export default useCustomCart;
