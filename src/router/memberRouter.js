import { Suspense, lazy } from "react";

const Loading = <div>Loading....</div>;
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
        <Suspense fallback={Loading}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "kakao",
      element: (
        <Suspense fallback={Loading}>
          <KakaoRedirect />
        </Suspense>
      ),
    },
    {
      path: "modify",
      element: (
        <Suspense fallback={Loading}>
          <MemberModify />
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
      path: "forgot-password",
      element: (
        <Suspense fallback={Loading}>
          <ForgotPassword />
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
  ];
};

export default memberRouter;
