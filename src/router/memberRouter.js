import { Suspense, lazy } from "react";
import LoadingSpinner from "./LoadingSpninner"; 

const Login = lazy(() => import("../pages/member/LoginPage"));
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"));
const MemberModify = lazy(() => import("../pages/member/ModifyPage"));
const Register = lazy(() => import("../pages/member/RegisterPage"));
const ForgotPassword = lazy(() => import("../pages/member/ForgotPasswordPage"));
const MyPage = lazy(() => import("../pages/member/MyPagePage"));

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MemberModify />
        </Suspense>
      ),
    },
    {
      path: "register",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <Register />
        </Suspense>
      ),
    },
    {
      path: "forgot-password",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <ForgotPassword />
        </Suspense>
      ),
    },
    {
      path: "mypage",
      element: (
        <Suspense fallback={<LoadingSpinner />}>
          <MyPage />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
