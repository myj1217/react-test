import { Suspense, lazy } from "react";
const Loading = <div>Loading...</div>;
const Login = lazy(() => import("../pages/member/LoginPage"));
const Register = lazy(() => import("../pages/member/RegisterPage"));
const MyPage = lazy(() => import("../pages/member/MyPage"));
const CartPage = lazy(() => import("../pages/member/CartPage"));
const FavoritePage = lazy(() => import("../pages/member/FavoritePage"));
const CheckOut = lazy(() => import("../pages/member/CheckOutPage"));
const Edit = lazy(() => import("../pages/member/EditPage"));

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={Loading}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "mypage",
      element: (
        <Suspense fallback={Loading}>
          <MyPage />
        </Suspense>
      ),
    },
    {
      path: "cart",
      element: (
        <Suspense fallback={Loading}>
          <CartPage />
        </Suspense>
      ),
    },
    {
      path: "favorites",
      element: (
        <Suspense fallback={Loading}>
          <FavoritePage />
        </Suspense>
      ),
    },
    {
      path: "checkout",
      element: (
        <Suspense fallback={Loading}>
          <CheckOut />
        </Suspense>
      ),
    },
    {
      path: "edit",
      element: (
        <Suspense fallback={Loading}>
          <Edit />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
